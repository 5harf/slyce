module.exports = function (knex) {
  return knex.schema.createTable('qa_join_users', function (table) {
    table.increments('id').primary();
    table.boolean('is_host');
    table.integer('user_id')
      .references('u_id')
      .inTable('users');
    table.integer('session_id')
      .references('session_id')
      .inTable('qa_session');
  })
}
