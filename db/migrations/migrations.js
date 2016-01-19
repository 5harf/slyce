var answers = require('../schema/answerSchema');
var questions = require('../schema/questionSchema');
var qa = require('../schema/qaSchema');
var users = require('../schema/userSchema');
var qaJoinUsers = require('../schema/qaJoinUserSchema');

exports.up = function(knex, Promise) {

  return Promise.all([
    users(knex),
    qa(knex),
    questions(knex),
    answers(knex),
    qaJoinUsers(knex)
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('answers'),
    knex.schema.dropTable('questions'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('qa_join_users'),
    knex.schema.dropTable('qa_session')
  ]);
};
