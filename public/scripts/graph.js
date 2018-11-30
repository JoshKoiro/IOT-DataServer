// $(() => {
//     var socket = io();

//     socket.on('update data', (data) => {
//         var paramsArray = Object.keys(data.newData)
//         paramsArray.forEach((e) => {
//             chart.animate({
//                 opacity: {
//                   dur: 1000,
//                   from: 0,
//                   to: 1
//                 }
//         })
//     })
// })

var data = {
    // A labels array that can contain any sort of values
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    // Our series array that contains series objects or in this case series data arrays
    series: [
      [5, 2, 4, 2, 0]
    ]
  };

  var options = {
    height:400,
    showPoint:false,
    lineSmooth: true,
    showGrid: false,
    showLabel: true
  };

  // Create a new line chart object where as first parameter we pass in a selector
  // that is resolving to our chart container element. The Second parameter
  // is the actual data object.
  let chart = new Chartist.Line('.ct-chart', data,options);

// })