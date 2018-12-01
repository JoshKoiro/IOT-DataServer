$(() => {

    var refreshTimes = window.setInterval(refresh,60000)

    var socket = io();

    socket.on('update data', (data) => {
        //update values on dashboard
        $("#dataLength").text(data.dataLength)
        $("#lastDataTime").text(moment(data.timeStamp).startOf("minute").fromNow())
        
    })
})