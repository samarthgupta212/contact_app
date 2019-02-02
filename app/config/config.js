require('dotenv').config();
// this is important!
module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'contact_book_db',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
  },
  test: {
    username: "postgres",
    password: null,
    database: "contact_book_test",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
