/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('debts', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('type', 50).notNullable(); // credit_card, auto_loan, mortgage
    table.string('lender_name', 100);
    table.decimal('principal', 12, 2).notNullable();
    table.decimal('current_balance', 12, 2);
    table.decimal('interest_rate', 5, 2);
    table.decimal('minimum_payment', 10, 2);
    table.decimal('monthly_payment', 10, 2);
    table.integer('term_months');
    table.date('start_date');
    table.integer('due_day');
    table.integer('grace_period_days');
    table.decimal('late_fee', 10, 2);
    table.boolean('auto_pay').defaultTo(false);
    table.date('last_payment_date');
    table.date('next_payment_date');
    table.boolean('paid_off').defaultTo(false);
    table.date('forecast_payoff_date');
    table.text('notes');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('debts');
};
