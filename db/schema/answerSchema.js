module.exports = function (knex) {
  return knex.schema.createTable('answers', function (table) {
    table.increments('a_id').primary();
    table.string('text');
    table.string('image_url');
    table.integer('question_id')
      .references('q_id')
      .inTable('questions');
    table.integer('user_id')
      .references('u_id')
      .inTable('users');
  })
}
