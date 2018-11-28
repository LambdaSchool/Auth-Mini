exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments();
    tbl.string("username", 128).notNullable();
    tbl.string("password", 128).notNullable();
    tbl.string("department", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
