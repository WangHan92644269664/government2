
const path = require('path')

const config = require('./config')

const jsonserver = require('json-server')

const ip = config.SERVER
const port = config.PORT
const db_file = config.DB_FILE

const server = jsonserver.create()

const middlewares = jsonserver.defaults()

const router = jsonserver.router(path.join(__dirname, config.DB_FILE))

server.use(jsonserver.bodyParser)

server.use(middlewares)

server.use((req, res, next) => {
  res.header('X-xiaolin', 'xiaomei')
  next()
})

router.render = (req, res) => {
  res.jsonp({
    code: 0,
    body: res.locals.data
  })
}

server.use(router)

server.listen({
  host: ip,
  port: port
},function(){
  console.log(JSON.stringify(jsonserver));
  console.log(`JSON Server is running in http://${ip}:${port}`)
})