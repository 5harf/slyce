module.exports = function (knex) {
  return knex.schema.createTable('qa_session', function (table) {
    table.increments('session_id').primary();
    table.dateTime('start_time');
    table.dateTime('end_time');
  })
}
