/* ------------------------------------------
   Hermes Bridge config
--------------------------------------------- */
const dotEnv = require('dotenv').config() // /!\ think about renaming the dot.env as .env
const createBridgeServer = require('hermes-bridge')

if (dotEnv.error) { // ensure .env file exists
  console.log('========================')
  console.error('No .env file detected')
  console.log('========================')
  process.exit(1)
}

// Response used when no adaptors are connected (some providers like Facebook, accept 2xx status code only)
const responseFallback = {
  statusCode: 500,
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ error: 'No local server provided' })
}

createBridgeServer({
  httpHost: 'localhost', // default '127.0.0.1' (set to 0.0.0.0 to access from the outside by default)
  httpPort: 8000, // port on which the Bridge will listen
  socketHost: 'localhost', // default httpHost || '127.0.0.1' (set to 0.0.0.0 to access from the outside by default)
  socketPort: 9000, // this port will be reused for the adaptor configuration
  dashboard: { // for you to control your adaptors in real time
    host: 'localhost', // default '127.0.0.1' (set to 0.0.0.0 to access from the outside by default)
    port: 8001, // port to access the dashboard
    adminAuth: { // credentials to connect onto the dashboard
      username: 'admin',
      password: dotEnv.parsed.ADMIN_AUTH_PASSWORD, // Change it into your .env file!
      jwtSecret: dotEnv.parsed.ADMIN_AUTH_JWT_SECRET // Change it also into your .env file!
    }
  },
  loggerLevel: 'verbose', // 'info'
  defaultResponse: responseFallback // by default, hermes provide the fallback described above
})
