/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('incomes', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('source_name', 100).notNullable(); // e.g. BAH, Base Pay
    table.decimal('amount', 10, 2).notNullable();
    table.string('frequency', 50).notNullable(); // monthly, biweekly
    table.date('start_date').notNullable();
    table.date('end_date');
    table.boolean('taxable').defaultTo(true);
    table.string('income_type', 50); // military, rental, etc.
    table.text('description');
    table.boolean('adjusts_annually').defaultTo(false);
    table.decimal('increase_rate', 5, 2);
    table.boolean('direct_deposit').defaultTo(true);
    table.boolean('paystub_required').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('incomes');
};
