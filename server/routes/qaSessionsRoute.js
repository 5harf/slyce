var express = require('express');
var router = express.Router();

var usersController = require('../db/dbcontrollers/usersController')
var qaSessionsController = require('../db/dbcontrollers/qaSessionsController')
var questionsController = require('../db/dbcontrollers/questionsController')

module.exports = function (knex) {

  userCtrl = usersController(knex);
  qaCtrl = qaSessionsController(knex);
  questionCtrl = questionsController(knex);
  
  //Create a new QA session and return the created object
  //Correct time format for start and end time is: 2001-09-28 01:00:00
  router.route('/')

    .post(function (req, res) {
      var hostName = req.body.host_name;
      userCtrl.makeUser(hostName)
      .then(function (userId) {
        return qaCtrl.makeQaSession(hostName, req.body.start_time, req.body.end_time, userId)
      })
      .then(function (sessionId) {
        return qaCtrl.querySession(sessionId)
      })
      .then(function (session) {
        res.status(201).send(session);
      })
      .catch(function (err) {
        res.status(500).json({
          message: err
        });
      });
    });

  //Get one QA session represented by its id
  router.route('/:session_id')

    .get(function (req, res) {
      var sessionId = req.params.session_id;
      qaCtrl.querySession(sessionId)
      .then(function (session) {
        res.send(session);
      })
      .catch(function (err) {
        res.status(500).json({
          message: err
        });
      });
    });

  //Get all questions for the QA session represented by session_id 
  //If query string contains state=answered or state=unanswered the result will be filtered accordingly
  router.route('/:session_id/questions')

    .get(function (req, res) {
      var sessionId = req.params.session_id;
      var filter = req.query.state;
      questionCtrl.getQuestions(sessionId, filter)
      .then(function (questions) {
        res.send(questions);
      })
      .catch(function (err) {
        res.status(500).json({
          message: err
        });
      });
    });

  return router;
}
