$(() => {
    var socket = io();

    socket.on('update data', (data) => {
        console.log('data has been entered')
        var markup = ""
        var paramsArray = Object.keys(data.dataPoint)
        paramsArray.forEach((e) => {
            markup = markup + "<td class='text-center'>" + data.dataPoint[e] + "</td>"
        })
        markup = "<tr>" + markup + "</tr>"
        $("#insertPoint").append(markup)
    })
})
