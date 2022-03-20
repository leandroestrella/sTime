/* init */
console.log('server is starting');
const express = require('express');
const app = express();

var cors = require('cors');
var server = app.listen(process.env.PORT || 3000, listening);

console.log('current sTIME(s)');
var fs = require('fs');
var data = fs.readFileSync('stimes.json');
var stimes = JSON.parse(data);
console.log(stimes);

function listening() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('sTIME app listening at http://' + host + ':' + port);
}
app.use(express.static('public'));
app.use(cors());

// A router to load a URL
app.get('/load', loadURL);

// This is a module for HTTP Requests
var request = require('request');

// Callback
function loadURL(req, res) {
    // Get the URL from the user
    var url = req.query.url;

    // Execute the HTTP Request
    request(url, loaded);

    // Callback for when the request is complete
    function loaded(error, response, body) {
        // Check for errors
        if (!error && response.statusCode == 200) {
            // The raw HTML is in body
            res.send(body);
        } else {
            res.send('error');
        }
    }
}

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