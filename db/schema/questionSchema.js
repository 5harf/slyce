module.exports = function (knex) {
  return knex.schema.createTable('questions', function (table) {
    table.increments('q_id').primary();
    table.string('text');
    table.string('image_url');
    table.integer('user_id')
      .references('u_id')
      .inTable('users');
    table.integer('session_id')
      .references('session_id')
      .inTable('qa_session');
  })
}
