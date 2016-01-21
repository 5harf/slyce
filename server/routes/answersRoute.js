var express = require('express');
var router = express.Router();

var usersController = require('../db/dbcontrollers/usersController');

var answersController = require('../db/dbcontrollers/answersController');

module.exports = function (knex) {

  userCtrl = usersController(knex);
  answerCtrl = answersController(knex);

  router.route('/:question_id')
  .post(function (req, res) {
    
    var questionId = req.body.question_id;
    var text = req.body.text;
    var imageUrl = req.body.image_url;
    var name = req.body.answered_by_name;

    userCtrl.makeUser(name)
    .then(function (userId) {
      return answerCtrl.answerQuestion(userId, questionId, text, imageUrl);
    })
    .then(function (answer) {
      res.status(201);
      res.send(answer);
    })



  }) 

  return router;
}
