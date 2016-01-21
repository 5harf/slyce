var express = require('express');
var bodyParser = require('body-parser');

//Import other router files
var qaSessions = require('./qaSessionsRoute');
var questions = require('./questionsRoute');
var answers = require('./answersRoute');


module.exports = function(knex) {

  var router = express.Router();

  router.use(bodyParser());

  //Pass knex to other files
  qaSessions = qaSessions(knex);
  questions = questions(knex);
  answers = answers(knex);

  //Route requests to their respective routers
  router.use('/qa', qaSessions);
  router.use('/answer', answers);
  router.use('/question', questions);

  return router;

}
