const http = require('http')
const io = require('socket.io')
const app = require('./app')
const socketFunc = require('./sockets')

const httpServer = http.createServer(app)
const socketServer = io(httpServer)

const port = 4500

httpServer.listen(port)
console.log(`Server listening on port ${port}...`)
 
socketFunc(socketServer)
 