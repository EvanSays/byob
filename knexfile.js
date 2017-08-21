module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/goodbooks',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

  seeds: {
    directory: './db/seeds/dev'
  },
  useNullAsDefault: true
};
