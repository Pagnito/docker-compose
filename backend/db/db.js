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

setTimeout(() =>{
  createCarsTable(connection);
  //Didnt have time to debug, how to wait to make sure database is created before creating tables
}, 2000)

module.exports = connection;