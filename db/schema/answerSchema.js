module.exports = function (knex) {
  return knex.schema.createTableIfNotExists('answers', function (table) {
    table.increments('a_id').primary();
    table.string('text');
    table.string('imageUrl');
    table.integer('id_questions')
      .references('id')
      .inTable('questions');
    table.integer('id_users')
      .references('id')
      .inTable('users');
  })
}
