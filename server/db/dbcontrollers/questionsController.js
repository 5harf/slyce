var _ = require('lodash');

module.exports = function (knex) {
  var module = {};

  module.getQuestions = function (sessionId, filter) {

    return knex.select('answered_by_user.u_id AS answered_by_user_id', 'answered_by_user.name AS answered_by_user_name', 'asked_by_user.u_id AS asked_by_user_id', 'asked_by_user.name AS asked_by_user_name', 'questions.text AS question_text', 'questions.session_id', 'questions.q_id', 'answers.a_id', 'answers.text AS answer_text', 'answers.image_url AS answer_image_url', 'questions.q_id')
    .from('questions')
    .leftJoin('answers', 'questions.q_id', 'answers.question_id')
    .leftJoin('users AS asked_by_user', 'asked_by_user.u_id', 'questions.user_id')
    .leftJoin('users AS answered_by_user', 'answers.user_id', 'answered_by_user.u_id')
    .where({
      session_id: sessionId
    })
    .then(function (questions) {
      
      //Parse data into a well formed JavaScript object
      var questions = _.reduce(questions, function (accumulator, current) {
        var q_id = current.q_id;
        var answer;
        if (current.answer_text) {
          answer = {
            text: current.answer_text,
            image_url: current.answer_image_url,
            answered_by_user: {
              u_id: current.answered_by_user_id,
              name: current.answered_by_user_name
            }
          };
          
        }

        if (accumulator[q_id]) {
          accumulator[q_id].answers.push(answer);
        } else {
          accumulator[q_id] = {
            q_id: current.q_id,
            text: current.question_text,
            session_id: current.session_id,
            asked_by_user: {
              u_id: current.asked_by_user_id,
              name: current.asked_by_user_name
            },
            answers: []
          };
          if (answer) {
            accumulator[q_id].answers.push(answer);
          }
        }
        return accumulator;
      }, {})

      questions = _.map(questions, function (question) {
        return question;
      });

      //Filter data before returning
      if (filter === 'answered' || filter === 'unanswered') {
        return _.filter(questions, function (question) {
          if (filter === 'answered') {
            return question.answers.length > 0;
          } else if (filter === 'unanswered') {
            return question.answers.length === 0;
          }
        });
      } else {
        return questions;
      }
    })
  };

  module.askQuestion = function (sessionId, userId, text) {
    return knex('questions').insert({
      session_id: sessionId,
      user_id: userId,
      text: text
    }).returning('q_id')
    .then(function(questionId) {
      return knex('questions').where({
        q_id: questionId[0]
      });
    })
    .then(function(question) {
      return question[0];
    })
  }

  return module;

};
