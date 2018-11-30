$(() => {
    var socket = io();

    socket.on('update data', (data) => {
        console.log('data has been entered')
        var markup = ""
        var paramsArray = Object.keys(data.newData)
        paramsArray.forEach((e) => {
            markup = markup + "<td class='text-center'>" + data.newData[e] + "</td>"
        })
        markup = "<tr>" + markup + "</tr>"
        $("#insertPoint").append(markup)
    })
})
