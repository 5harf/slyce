module.exports = function (knex) {
  var module = {};

  module.getQuestions = function (sessionId) {
    //TODO return with ask/answer user models, and answers for each of the questions.  Also add filtering based on answered or not answered.
    return knex('questions').where({
      session_id: sessionId
    })
  };

  module.askQuestion = function (sessionId, userId, text, imageUrl) {
    return knex('questions').insert({
      session_id: sessionId,
      user_id: userId,
      text: text,
      image_url: imageUrl
    }).returning('q_id')
    .then(function(questionId) {
      return knex('questions').where({
        q_id: questionId[0]
      });
    })
    .then(function(question) {
      return question[0];
    })
    .catch(function (err) {
      throw new Error(err);
    });
  }

  return module;

};
