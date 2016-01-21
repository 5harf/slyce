module.exports = function (knex) {
  return knex.schema.createTable('qa_session', function (table) {
    table.increments('qa_id').primary();
    table.dateTime('start_time');
    table.dateTime('end_time');
  })
}
