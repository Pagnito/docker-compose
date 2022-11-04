const createCarsTable = (db) => {
  db.schema.hasTable('cars').then(function (exists) {
    if (!exists) {
      return db.schema.createTable('cars', function (t) {
        t.increments('id').primary();
        t.string('make', 100);
        t.string('model', 100);
        t.string('package', 100);
        t.string('color', 100);
        t.integer('year', 4);
        t.string('category', 100);
        t.integer('mileage');
        t.bigInteger('price(cents)');
        t.timestamp('created_at').defaultTo(db.fn.now());
      });
    }
  });
}
module.exports = createCarsTable;