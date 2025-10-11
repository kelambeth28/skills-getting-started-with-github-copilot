module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './employees.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    }
  }
};
