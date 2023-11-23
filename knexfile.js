// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const common = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: { directory: "./data/migrations" },
  seeds: { directory: "./data/seeds" },
};

module.exports = {
  development: {
    ...common,
    client: "sqlite3",
    connection: {
      filename: "./data.teams.db3",
    },
  },

  testing: {
    ...common,
    connection: {
      filename: "./data.teams.db3",
    },
  },

  production: {},
};
