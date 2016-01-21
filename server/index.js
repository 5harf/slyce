var express = require('express');
var knex = require('./db');
var router = require('./routes');
var path = require('path');

var port = 8080;

var morgan = require('morgan');


var app = express();

//Middleware which logs request to console
app.use(morgan('dev'));

//Route requests through routes folder
app.use(router(knex));

//Serve problem statement file
app.use('/', express.static(path.join(__dirname,'../Public')));

app.listen(port);

console.log('Server listening on port', port);

//Export app for use in integration tests
module.exports = app;
