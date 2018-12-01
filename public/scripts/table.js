$(() => {
    var socket = io();

    socket.on('update data', (data) => {
        data.dataPoint.timeStamp = moment(data.dataPoint.timeStamp).format('MMMM Do YYYY, h:mm:ss a')
        var markup = ""
        var paramsArray = Object.keys(data.dataPoint)
        paramsArray.forEach((e) => {
            markup = markup + "<td class='text-center'>" + data.dataPoint[e] + "</td>"
        })
        markup = "<tr>" + markup + "</tr>"
        $("#insertPoint").append(markup)
    })
})
