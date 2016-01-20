var express = require('express');
var router = express.Router();

var usersController = require('../db/dbcontrollers/usersController');
var questionsController = require('../db/dbcontrollers/questionsController');

module.exports = function (knex) {
  //TODO add routes

  userCtrl = usersController(knex);
  questionCtrl = questionsController(knex);


  router.route('/:question_id')
  .post(function (req, res) {

    var sessionId = req.body.session_id;
    var text = req.body.text;
    var name = req.body.asked_by_name;

    userCtrl.makeUser(name)
    .then(function (userId) {
      return questionCtrl.askQuestion(sessionId, userId, text)
    })
    .then(function (question) {
      res.status(201);
      res.send(question)
    })
  })

  return router;
}
