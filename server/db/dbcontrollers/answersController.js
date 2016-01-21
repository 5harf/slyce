module.exports = function (knex) {
  var module = {};

  module.answerQuestion = function (userId, questionId, text, imageUrl) {
    return knex('answers').insert({
      user_id: userId,
      question_id: questionId,
      text: text,
      image_url: imageUrl
    })
    .returning('a_id')
    .then(function (answerId) {
      return knex('answers').where({
        a_id: answerId[0]
      });
    })
    .then(function(answer) {
      return answer[0];
    })
    .catch(function (err) {
      throw new Error(err);
    });
  }

  return module;

};
