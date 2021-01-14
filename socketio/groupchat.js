module.exports = function (io, Users) {
    const users = new Users()
    io.on('connection', (socket) => {
        console.log('User Connected')
        socket.on('join', (params, callback) => {
            socket.join(params.room)
            users.AddUserData(socket.id, params.sender, params.room)
            console.log('us', params)

            io.to(params.room).emit('UserList', users.GetUsersList(params.room))
            callback()
        })
        socket.on('createMessage', (message, callback) => {
            console.log(message)
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.from

            })
            callback()
        })
    })


}