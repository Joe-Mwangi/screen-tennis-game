const server = require('http').createServer()
const io = require('socket.io')(server)
const port = 4000

server.listen(port)
console.log(`Server listening on port ${port}...`)
 
io.on('connection', socket => {
    console.log('a user connected...')
})