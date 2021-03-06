var express = require('express');
var router = express.Router();

var usersController = require('../db/dbcontrollers/usersController');

var answersController = require('../db/dbcontrollers/answersController');

module.exports = function (knex) {

  userCtrl = usersController(knex);
  answerCtrl = answersController(knex);
  
  //Answer a question which is represented by question_id and return question object
  router.route('/:question_id')

    .post(function (req, res) {

      var questionId = req.body.question_id;
      var text = req.body.text;
      var imageUrl = req.body.image_url;
      var name = req.body.answered_by;

      userCtrl.makeUser(name)
      .then(function (userId) {
        return answerCtrl.answerQuestion(userId, questionId, text, imageUrl);
      })
      .then(function (answer) {
        res.status(201);
        res.send(answer);
      })
      .catch(function (err) {
        res.status(500).json({
          message: err
        });
      });
    }); 

  return router;
}
