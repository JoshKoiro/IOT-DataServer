# IOT-DataServer
Server template to capture data points from one or multiple clients for analysis using url parameters

### Setup

Download the repo from Github: `git clone https://github.com/JoshKoiro/IOT-DataServer.git`

Run `npm install` to download dependencies

Run `node server.js` to run server

### Usage

open a web browser and navigate to `localhost:3000` to go to server dashboard

`localhost:3000/read` will show you all captured data in json format

`localhost:3000/write/...` is the base command to write data to the server with data points being inserted seperated by slashes (i.e):

`localhost:3000/write/currentTemp/75`

This will write the following json block to the server:

```javascript
    {
        "parameterOne": "currentTemp",
        "parameterTwo": "75",
        "timeStamp": "10/28/2018 9:36:12"
    }
```

### Current Features

- [x] Write data to data server (saved in memory)
- [x] Enter data from shell script 
- [x] Read and save server data to .csv file
- [x] Integrate Socket.io for real-time server-client interaction

### Features in the works

- [ ] Save server data to database
- [ ] create shell script dynamically (createScript.js)