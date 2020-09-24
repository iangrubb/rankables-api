
exports.up = function(knex) {

    return knex.schema
    .createTable('lists', function (table) {
       table.increments('id');
       table.string('title', 255).notNullable()
       table.text('description').notNullable()
       table.boolean('published').notNullable().defaultTo(false)

       table.timestamp('created_at').defaultTo(knex.fn.now());

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("lists")
};
