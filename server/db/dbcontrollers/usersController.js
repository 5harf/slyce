module.exports = function (knex) {

  var module = {};
  module.makeUser = function (name) {
    return knex('users').insert({
      name: name
    })
    .returning('u_id')
    .then(function (userId) {
      return userId[0];
    })
  }
  
  return module;

};
