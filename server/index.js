var express = require('express');
var knex = require('./db');
var router = require('./routes');

var port = 8080;

var bodyParser = require('body-parser');
var morgan = require('morgan');


var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(router(knex));

app.listen(port);

console.log('Server listening on port', port);

module.exports = app;
