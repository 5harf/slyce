module.exports = function (knex) {
  var module = {};

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
  };

  module.querySession = function () {
    return {name: 'test', questions: 'test', session_id: 1};
  } 

  return module;

};
