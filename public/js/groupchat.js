

$(document).ready(function () {
    var socket = io()
    console.log(socket)
    socket.on('connect', () => {
        console.log('yeah User Connected')
    })
    socket.on('newMessage', function (data) {
        console.log(data)

    })
    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        const message = $(msg).val()
        console.log(message)
        socket.emit('createMessage', { text: message })
        $(msg).val('')

    })
})