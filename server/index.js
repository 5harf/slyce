var express = require('express');
var knex = require('./db');
var router = require('./routes');
var path = require('path');

var port = 8080;

var morgan = require('morgan');


var app = express();

app.use(morgan('dev'));

app.use(router(knex));

app.use('/', express.static(path.join(__dirname,'../Public')));

app.listen(port);

console.log('Server listening on port', port);

module.exports = app;
