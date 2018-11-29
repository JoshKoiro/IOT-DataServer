
    var socket = io();

    socket.on('update data', (data) => {
        console.log('data has been entered')
        var markup = ""
        Object.keys(data).forEach((e) => {
            markup = markup + "<td>" + data[e] + "</td>"
        })
        markup = "<tr>" + markup + "</tr>"
        $("table tbody").append(markup)
    })
