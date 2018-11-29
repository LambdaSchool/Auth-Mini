
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()
      tbl.text('username').unique().notNullable()
      tbl.text('password').notNullable()
      tbl.text('department').notNullable()
  })
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};