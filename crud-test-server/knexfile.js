// Update with your config settings.

// const dbConnection = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${HOST_DEV}:${PG_PORT}/${POSTGRES_DB}`;

// docker run --rm --name pg-docker \
//    -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=postgres -e POSTGRES_DB=mainDB \
//    -p 5432:5432 \
//    -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data \
//    postgres:latest

require("dotenv").config({ path: "./.env.dev" });
const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, HOST_DEV, PG_PORT } =
  process.env;
const dbConnection = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${HOST_DEV}:${PG_PORT}/${POSTGRES_DB}`;
console.log(dbConnection);

module.exports = {
  development: {
    client: "pg",
    connection: dbConnection,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  },

  production: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
