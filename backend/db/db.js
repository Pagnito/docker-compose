const knex = require('knex');
const createCarsTable = require('./schemas/cars');
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;
const connection = knex({
    client: 'pg',
    connection: {
        host: PGHOST,
        port: PGPORT,
        user: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE
    }
});

createCarsTable(connection);

module.exports = connection;