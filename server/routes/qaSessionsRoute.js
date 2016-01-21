var express = require('express');
var router = express.Router();

var usersController = require('../db/dbcontrollers/usersController')
var qaSessionsController = require('../db/dbcontrollers/qaSessionsController')
var questionsController = require('../db/dbcontrollers/questionsController')

module.exports = function (knex) {

  userCtrl = usersController(knex);
  qaCtrl = qaSessionsController(knex);
  questionCtrl = questionsController(knex);

  router.route('/')
  .post(function (req, res) {
    var hostName = req.body.host_name;
    userCtrl.makeUser(hostName)
    .then(function (userId) {
      qaCtrl.makeQaSession(hostName, req.body.start_time, req.body.end_time, userId)
      .then(function (sessionId) {
        qaCtrl.querySession(sessionId)
        .then(function (session) {
          res.status(201);
          res.send(session);
        });
      });
    });
  });

  router.route('/:session_id')
  .get(function (req, res) {
    var sessionId = req.params.session_id;
    qaCtrl.querySession(sessionId)
    .then(function (session) {
      res.send(session);
    });
  });

  router.route('/:session_id/questions')
  .get(function (req, res) {
    var sessionId = req.params.session_id;
    questionCtrl.getQuestions(sessionId)
    .then(function (questions) {
      res.send(questions);
    });
  });

  return router;
}
