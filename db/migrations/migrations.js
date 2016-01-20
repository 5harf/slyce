var users = require('../schema/userSchema');
var qaSession = require('../schema/qaSchema');
var questions = require('../schema/questionSchema');
var answers = require('../schema/answerSchema');
var qaJoinUsers = require('../schema/qaJoinUserSchema');

exports.up = function(knex, Promise) {
  return Promise.all([
    users(knex),
    qaSession(knex),
    questions(knex),
    answers(knex),
    qaJoinUsers(knex)
    ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('qa_join_users'),
    knex.schema.dropTable('answers'),
    knex.schema.dropTable('questions'),
    knex.schema.dropTable('qa_session'),
    knex.schema.dropTable('users')
  ]);
};
