//TEMPLATE CONFIGURATION PARAMETERS --------------------------------------------------------------

//set up parameters to be tracked
//Parameter Names must have no spaces!
var parameters = [
    'parameterOne',
    'parameterTwo'
]

//CSV File Name and Location
var fileLoc = "data.csv"

//-------------------------------------------------------------------------

//IMPORT DEPENDENCIES -----------------------------------------------------

//set up express server
var express = require('express');
var app = express();

//import file system and os components
var fs = require('fs');
var os = require('os');
var path = require('path');

//import csv parsing components
var csv = require('fast-csv');

//import http server components
var http = require('http').Server(app)

//import socket.io components
var io = require('socket.io')(http);

//import moment.js
var moment = require('moment');

//--------------------------------------------------------------------------

//PREPARE .CSV FILE DATABASE -----------------------------------------------

//data to be stored in memory
var data = []

//variable to store new datapoint to push to clients
var dataPacket = ""

//Check if data file exists. If so, import. If not, create one.
fs.exists(fileLoc,(exist) => {
    if(exist){

        //Case that data file with specified name from variable fileLoc does exist in directory
        
        console.log("Loading Data File")
            
        //Using fast-csv to parse the existing csv file
        var parser = csv.fromPath(fileLoc,{headers:true, discardUnmappedColumns:false,objectMode:true})
            .on("data",function(csvData){
                data.push(csvData)
            })
            .on("end",function(){
                console.log('Data from ' + fileLoc + ' successfully loaded....listening for data entry')
            })
    } 
    else { 

        //Case that there is no .csv file with name specified by variable fileLoc in directory

        console.log ('Creating ' + fileLoc + ' as data file')
        
        //format header row in csv file
        // var header = parameters.join(",") + ",timeStamp"
        var header = parameters.join(',')
        
        //add header to data file
        fs.appendFile(fileLoc, header, function (err) {
            if (err) throw err;
                console.log('Headers created....listening For data entry');
        });
    }
})

//--------------------------------------------------------------------------

//take the parameters in config array and join them together as string for express server routing with parameters
var serverCall = ":" + parameters.join("/:")
console.log(serverCall)

//set variables to pass into views
let viewHeaders = parameters
    viewHeaders.push('timeStamp')

//set date variable
var currentDate = new Date()

//Setup view engine for html template files
app.set("view engine", "pug");

//Setup Express to look at views folder for pug files
app.set("views",path.join(__dirname, "views"));

app.use(express.static(__dirname + '/public'));

//Load Dashboard on Client
app.get('/', function (req, res) {
    console.log(data.length)
    res.render("dashboard",{
        dataPoints: data,
        dataLength: data.length,
        firstDataTime: data.length === 0 ? "No Data Collected" : data[0].timeStamp,
        lastDataTime: data.length === 0 ? "No Data Collected" : data[data.length - 1].timeStamp,
        culmulativeData: 0
    })
})

//Load Tabular Data on Client
app.get('/table', function (req, res) {
    res.render("table",{
        headers:viewHeaders,
        data:data
    })
})

//write data to data file routing
app.get('/write/' + serverCall, function (req, res) {
    res.header("Content-Type","text/plain")
    //set currentDate variable to current time
    currentDate = new Date()
    //set timestamp parameter
    req.params.timeStamp = (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds()
    
    //send confirmation to user
    res.send('data point recieved')
    // res.send(req.params);

    //push data to memory location
    data.push(req.params);

    //push data to file location

    //format csv entry
    var csvEntry = ""
    var csvEntryFormat = Object.keys(req.params).forEach((e,i) => {
        csvEntry = csvEntry + req.params[e] +  ','
    })
    dataPacket = req.params
    io.sockets.emit('update data',{
        dataPoint:dataPacket,
        dataLength: data.length
    })
    csvEntry = ",\r\n" + csvEntry.substr(0,csvEntry.length - 1)

    fs.appendFile(fileLoc, csvEntry, function (err) {
        if (err) throw err;
        console.log('new data written to data file.');
      });
 })

 //read data from data file routing
app.get('/read', function (req, res) {
    res.header("Content-Type","application/json")
    res.send(JSON.stringify(data,null,4))
 })


 //Socket io listeners

 io.on('connection',(socket) => {   
    console.log('client connected')
//     socket.on('data entry',() => {
//         io.sockets.emit('update data',{newData:dataPacket}) 
//  })
})


//run server 
var server = http.listen(3000, function () {
   var host = server.address().address
   var ipAddress = os.networkInterfaces()[Object.keys(os.networkInterfaces())[0]][1].address
   var port = server.address().port
   if(host = "::"){
       host = "localhost:"
   }

   console.log("data server is listening at: \r\n\r\n", ipAddress +":"+ port)
   console.log("\r\n\r\nParameters data server is listening for: ")
   parameters.slice(0,parameters.length -1).forEach((e) => console.log("-> " + e))
   console.log('\r\n\r\n')
})