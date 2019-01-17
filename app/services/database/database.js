import { Client } from 'pg';

import { SERVER } from './access-address';
import { errors } from '../../../errors';

/**
 * Singleton to request the postgres database.
 */
class Database {

  /** Private constructor. */
  constructor() {
    if (!this._instance) {
      this._instance = this;
      this._client = new Client(SERVER);
    }
  
    return this._instance;
  }

  /** Establishes a connection with the db. */
  async connect() {
    try {
      await this._client.connect();
    } catch (e) {
      throw errors.failToConnect;
    }

    return this;
  }

  /** Disconnects from the db. */
  disconnect() {
    return this._client.disconnect();
  }

  /**
   * Queries the database.
   * @param {*} queryStream 
   */
  _query(queryStream, values) {
    return this._client.query(queryStream, values);
  }
}

export default Database;
