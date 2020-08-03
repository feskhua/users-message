// config env for migrations
require('dotenv').config({ path: `${__dirname}/../../.env` });

const {
  DB_DIALECT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

module.exports = {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  // logging: false,
};
