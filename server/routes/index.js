var express = require('express');
var bodyParser = require('body-parser');

var qaSessions = require('./qaSessionsRoute');
var questions = require('./questionsRoute');
var answers = require('./answersRoute');


module.exports = function(knex) {

  var router = express.Router();

  router.use(bodyParser());

  qaSessions = qaSessions(knex);
  questions = questions(knex);
  answers = answers(knex);

  router.use('/qa', qaSessions);
  router.use('/answers', answers);
  router.use('/questions', questions);

  return router;

}
