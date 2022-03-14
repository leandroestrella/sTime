/* init */
console.log('server is starting');
var express = require('express');
var app = express();
var cors = require('cors');
var server = app.listen(3000, listening);

console.log('current sTimes');
var fs = require('fs');
var data = fs.readFileSync('stimes.json');
var stimes = JSON.parse(data);
console.log(stimes);

function listening() {
    console.log('listening...');
}
app.use(express.static('public'));
app.use(cors());

/* set sTime */
app.get('/set/:stime?', setStime);
function setStime(request, response) {
    var data = request.params;
    var current = new Date().toUTCString();
    var stime = parseFloat(data.stime);
    var reply;
    if (!stime) {
        reply = {
            error: 'sTime is required.'
        }
        response.send(reply);
    } else {
        stimes[current] = stime;
        var data = JSON.stringify(stimes, null, 2);
        fs.writeFile('stimes.json', data, finished);
        function finished(err) {
            console.log(stime + ' sTime saved');
            reply = {
                stime: stime,
                atime: current,
                status: 'sTime successfully saved.'
            }
            response.send(reply);
        }
    }
}

/* list sTimes */
app.get('/list', listStimes);
function listStimes(request, response) {
    response.send(stimes);
}

/* get sTime */
app.get('/get', getStime);
function getStime(request, response) {
    var stime = Object.keys(stimes).reverse()[0];
    var reply;
    if (stimes[stime]) {
        reply = {
            /*
            status: 'sTime found',
            sTime: stimes[stime],
            aTime: 'created on ' + stime + ' (aTime)'
            */
            sTime: stimes[stime]
        }
    } else {
        reply = {
            /*
            status: 'no sTime found',
            sTime: stime
            */
           sTime: 'no sTime found'
        }
    }
    response.send(reply);
}