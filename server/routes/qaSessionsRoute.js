var express = require('express');
var router = express.Router();

var usersController = require('../db/dbcontrollers/usersController')
var qaSessionsController = require('../db/dbcontrollers/qaSessionsController')

module.exports = function (knex) {

  userCtrl = usersController(knex);
  qaCtrl = qaSessionsController(knex);
  //TODO add routes for post /, get /:session_id, get /:session_id/questions

  router.route('/')
  .post(function (req, res) {
    var hostName = req.body.name;
    userCtrl.makeUser(hostName)
    .then(function (userId) {
      qaCtrl.makeQaSession(hostName, req.body.start_time, req.body.end_time, userId)
      .then(function (sessionId) {
        //send back event object
        var result = qaCtrl.querySession(sessionId);
        res.status(201);
        res.send(result);
      })
      
    });
  })



  return router;
}
