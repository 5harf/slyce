var knex = require('knex');
var config = require('./knexfile.js');

var ENV = 'development';
var db = knex(config[ENV]);

module.exports = db;
