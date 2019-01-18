/** Default dev environment. */
export const environment = {
  port: 8000,
  database: {
    domain: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'pass',
    database: 'postgres'
  },
  security: {
    hashRound: 10,
    privateKey: '_XeDZa!$4knWA(',
    expiration: 60000
  }
};
