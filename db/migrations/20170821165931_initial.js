exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('books', function(table) {
      table.integer('book_id').primary();
      table.string('goodreads_title');
      table.integer('goodreads_book_id');
      table.integer('goodreads_work_id');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('ratings', function(table) {
      table.increments('id').primary();
      table.integer('user_id');
      table.integer('rating');
      table.integer('book_id').unsigned()
      table.foreign('book_id')
        .references('books.book_id');

      table.timestamps(true, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('ratings'),
    knex.schema.dropTable('books')
  ]);
};
