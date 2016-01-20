module.exports = function (knex) {
  var module = {};

  module.answerQuestion = function (userId, questionId, text, imageUrl) {
    return knex('answers').insert({
      user_id: userId,
      question_id: questionId,
      text: text,
      image_url: imageUrl
    })
    .returning('u_id')
    .then(function (userId) {
      return userId[0];
    });
  }

  return module;

};
