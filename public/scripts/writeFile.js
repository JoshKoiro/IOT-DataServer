$(() => {
    var socket = io();
    var data = window.location.href.replace(/%20/g," ").split('/').slice(4)
    console.log(data)
    socket.emit('data entry',data)
})