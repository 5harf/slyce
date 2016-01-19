module.exports = function (knex) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments('u_id').primary();
    table.string('name');
  })
}
