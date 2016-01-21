var questionsController = require('./questionsController');

module.exports = function (knex) {
  var module = {};

  questionCtrl = questionsController(knex);

  module.makeQaSession = function (hostName, startTime, endTime, userId) {
    return knex('qa_session').insert({
      start_time: startTime,
      end_time: endTime
    }).returning('session_id')
    .then(function (sessionId) {
      sessionId = sessionId[0];
      return knex('qa_join_users').insert({
        user_id: userId,
        is_host: true,
        session_id: sessionId
      })
      .then(function () {
        return sessionId;
      })
    })
    .catch(function (err) {
      throw new Error(err);
    })
  };

  module.querySession = function (sessionId) {
    return knex.select('*')
    .from('qa_session')
    .innerJoin('qa_join_users', 'qa_join_users.session_id', 'qa_session.session_id')
    .innerJoin('users', 'users.u_id', 'qa_join_users.user_id')
    .then(function (session) {
      return session
    })

  } 

  return module;

};
