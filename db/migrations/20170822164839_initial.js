exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('journals', (table) => {
      table.increments('id').primary();
      table.integer('pubmed').unique();

      table.timestamps(true, true);
    }),

    knex.schema.createTable('genes', (table) => {
      table.increments('id').primary();
      table.integer('start');
      table.integer('end');
      table.string('chr'); //?
      table.string('strand');
      table.string('cellline');
      table.string('condition');
      table.string('sequence');
      table.string('symbol');
      table.string('ensg');
      table.decimal('log2fc'); //?
      table.string('rc_initial');
      table.string('rc_final');
      table.integer('effect');
      table.string('cas');
      table.string('screentype');

      table.integer('pubmed_journal').unsigned();
      table.foreign('pubmed_journal').references('journals.pubmed');

      table.timestamps(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('genes'),
    knex.schema.dropTable('journals'),
  ]);
};
