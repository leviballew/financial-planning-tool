/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('credit_cards', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('card_name', 100);
    table.string('issuer', 100);
    table.decimal('balance', 10, 2);
    table.decimal('credit_limit', 10, 2);
    table.decimal('available_credit', 10, 2);
    table.decimal('interest_rate', 5, 2);
    table.integer('due_day');
    table.decimal('minimum_payment', 10, 2);
    table.date('payment_date');
    table.decimal('cashback_rate', 5, 2);
    table.decimal('annual_fee', 10, 2);
    table.date('opened_date');
    table.date('closed_date');
    table.string('status', 20).defaultTo('open'); // open, closed, etc.
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('credit_cards');
};
