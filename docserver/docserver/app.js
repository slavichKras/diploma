/**
 * Module dependencies.
 */

var express = require('express');
var config = require('nconf');
var http = require('http');
var app = express();
config.argv().env().file({ file: 'config.json' });

//boot server
require('./boot/index')(app);

//routing procedures
require('./routes/index')(app);

http.createServer(app).listen(app.get('port'), function () {
    if ('development' === app.get('env')) {
        console.log('Express server listening on port ' + app.get('port'));
    }
});