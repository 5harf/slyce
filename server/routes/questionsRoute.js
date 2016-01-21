var express = require('express');
var router = express.Router();

var usersController = require('../db/dbcontrollers/usersController');
var questionsController = require('../db/dbcontrollers/questionsController');

module.exports = function (knex) {

  userCtrl = usersController(knex);
  questionCtrl = questionsController(knex);

  //Create and return a new question, using posted object as question, for the session represented by session_id
  router.route('/:session_id')

    .post(function (req, res) {

      var sessionId = req.params.session_id;
      var text = req.body.text;
      var name = req.body.asked_by_name;

      userCtrl.makeUser(name)
      .then(function (userId) {
        return questionCtrl.askQuestion(sessionId, userId, text)
      })
      .then(function (question) {
        res.status(201).send(question)
      })
      .catch(function (err) {
        res.status(500).json({
          message: err
        });
      });
    });

  return router;
}
