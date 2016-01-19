module.exports = function (knex) {
  return knex.schema.createTableIfNotExists('questions', function (table) {
    table.increments('q_id').primary();
    table.boolean('is_host');
    table.integer('user_id')
      .references('u_id')
      .inTable('users');
    table.integer('qa_id')
      .references('session_id')
      .inTable('qa_session');
  })
}
