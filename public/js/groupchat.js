

$(document).ready(function () {
    var socket = io()
    var room = $('#groupName').val()
    var fromName = $('#nameSender').val()
    socket.on('connect', () => {
        console.log('yeah User Connected')
        var params = {
            room: room,
            sender: fromName
        }
        socket.emit('join', params, function () {
            console.log('User has joined this channel')
        })
    })
    socket.on('newMessage', function (data) {
        var template = $('#message-template').html()
        var message = Mustache.render(template, {
            text: data.text,
            room: data.room,
            sender: data.from
        })
        $('#messages').append(message);


    })
    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        const message = $(msg).val()
        console.log(message)
        socket.emit('createMessage', {
            text: message,
            room: room,
            from: fromName
        }, function () {

            $(msg).val('')
        })

    })
})