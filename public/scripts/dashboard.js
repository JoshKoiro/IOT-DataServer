$(() => {
    var socket = io();

    socket.on('update data', (data) => {
        $("#dataLength").text(data.dataLength)
    })
})