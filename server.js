/* init */
console.log('server is starting');
const express = require('express');
const app = express();
const port = 443;

var cors = require('cors');
var server = app.listen(port, listening);

console.log('current sTIME(s)');
var fs = require('fs');
var data = fs.readFileSync('stimes.json');
var stimes = JSON.parse(data);
console.log(stimes);

function listening() {
    console.log('listening...');
}
app.use(express.static('public'));
app.use(cors());

/* set sTIME */
app.get('/set/:stime?', setStime);
function setStime(request, response) {
    var data = request.params;
    var current = new Date().toUTCString();
    var stime = parseFloat(data.stime);
    var reply;
    if (!stime) {
        reply = {
            error: 'sTIME is required.'
        }
        response.send(reply);
    } else {
        stimes[current] = stime;
        var data = JSON.stringify(stimes, null, 2);
        fs.writeFile('stimes.json', data, finished);
        function finished(err) {
            console.log(stime + ' sTIME saved');
            reply = {
                sTIME: stime,
                aTIME: current,
                status: 'sTIME successfully saved.'
            }
            response.send(reply);
        }
    }
}

/* list sTIME(s) */
app.get('/list', listStimes);
function listStimes(request, response) {
    response.send(stimes);
}

/* get sTIME */
app.get('/get', getStime);
function getStime(request, response) {
    var stime = Object.keys(stimes).reverse()[0];
    var reply;
    if (stimes[stime]) {
        reply = {
            /*
            status: 'sTIME found',
            sTIME: stimes[stime],
            aTIME: 'created on ' + stime + ' (aTIME)'
            */
            sTIME: stimes[stime]
        }
    } else {
        reply = {
            /*
            status: 'no sTIME found',
            sTIME: stime
            */
           sTIME: 'no sTIME found'
        }
    }
    response.send(reply);
}