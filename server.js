//TEMPLATE PARAMETERS --------------------------------------------------------------

//set up parameters to be tracked
//Parameter Names must have no spaces!
var parameters = [
    'parameterOne',
    'parameterTwo'
]

//CSV File Name and Location
var fileLoc = "data.csv"

//-------------------------------------------------------------------------

//set up express server
var express = require('express');
var app = express();
var fs = require('fs');
var csv = require('fast-csv');

//data to be stored in memory (temporary)
var data = []

//Check if data file exists. If so, import. If not, create one.
fs.exists(fileLoc,(exist) => {
    if(exist){
        console.log("Loading Data File")
            var parser = csv.fromPath(fileLoc,{headers:true})
            .on("data",function(csvData){
                data.push(csvData)
            })
            .on("end",function(){
                console.log('Data Successfully Loaded....Listening for Data Entry')
            })
    } 
    else {
        
        console.log ('Creating Data File')
        
        //format header row in csv file
        var header = parameters.join(",") + ",timeStamp"
        
        //add header to data file
        fs.appendFile(fileLoc, header, function (err) {
            if (err) throw err;
                console.log('Header Created....Listening For Data Entry');
        });
    }
})

//concat string to add to parameters to the routing routine
var serverCall = ":" + parameters.join("/:")

//set date variable
var currentDate = new Date()

//home routing
app.get('/', function (req, res) {
   res.header("Content-Type","text/plain")
   res.send('data server is running. to add data use: \r\n\r\n"/write/[' + parameters.join("]/[") + ']"' + '\r\n\r\n\r\n' + 'there are currently: ' + data.length + ' records in dataset.');
})

//write data to data file routing
app.get('/write/' + serverCall, function (req, res) {
    //set currentDate variable to current time
    currentDate = new Date()
    //set timestamp parameter
    req.params.timeStamp = currentDate.getMonth() + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + " " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() 
    
    //send confirmation to user
    res.header("Content-Type","text/plain")
    res.send(req.params);

    //push data to memory location
    data.push(req.params);

    //push data to file location

    //format csv entry
    console.log('req.params: ' + req.params["parameterOne"])
    var csvEntry = ""
    var csvEntryFormat = Object.keys(req.params).forEach((e,i) => {
        csvEntry = csvEntry + req.params[e] +  ','
    })
    csvEntry = "\r\n" + csvEntry.substr(0,csvEntry.length - 1)

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


//run express server 
var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   if(host = "::"){
       host = "localhost:"
   }

   console.log("data server is listening at ", host + port)
   console.log("Parameters data server is listening for: ")
   parameters.forEach((e) => console.log("-> " + e))
})