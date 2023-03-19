let readyPlayerCount = 0;

function socketFunc(io) {
    const pongNamespace = io.of('/pong')
    pongNamespace.on('connection', socket => {
        let room
        console.log('a user connected with ', socket.id)
    
        socket.on('ready', () => {
            room = 'room' + Math.floor(readyPlayerCount / 2)
            socket.join(room)

            console.log('Player ready ', socket.id, room)

            readyPlayerCount++
            if(readyPlayerCount %2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id)
            }
        })
    
        socket.on('paddleMove', paddleData => {
            socket.to(room).emit('paddleMove', paddleData)
        })
    
        socket.on('ballMove', ballData => {
            socket.to(room).emit('ballMove', ballData)
        })
    
        socket.on('disconnect', reason => {
            console.log(`Player ${socket.id} disconnected: ${reason}`)
            socket.leave(room)
        })
    })
}

module.exports = socketFunc