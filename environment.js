/** Default dev environment. */
export const environment = {
  ip: '127.0.0.1',
  port: 8000,
  database: {
    domain: '127.0.0.1',
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
