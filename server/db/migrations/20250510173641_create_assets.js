/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('assets', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('asset_type', 50); // vehicle, home, etc.
    table.text('description');
    table.decimal('purchase_price', 12, 2);
    table.decimal('current_value', 12, 2);
    table.decimal('depreciation_rate', 5, 2);
    table.decimal('appreciation_rate', 5, 2);
    table.date('purchase_date');
    table.integer('linked_debt_id').unsigned().references('id').inTable('debts');
    table.decimal('forecast_value_5yr', 12, 2);
    table.text('notes');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('assets');
};
