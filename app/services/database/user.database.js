import Database from './database';

/**
 * Class to manipulate users.
 */
class User extends Database {

  constructor() {
    super();

    this._table = 's_user';
  }

  /**
   * Adds a link in the database.
   * @param {*} user
   */
  async post({ name, hash, salt }) {
    if (!name || !hash || !salt) return;

    const query = `INSERT INTO ${this._table}(name, password, salt, token) VALUES ($1, $2, $3, $4)`;

    return this._query(query, [ name, hash, salt, 'token' ]);
  }

  /**
   * Deletes a specific user.
   * @param {*} id of the user.
   */
  async deleteOne(id) {
    if (id && Number.isInteger(id)) {
      const query = `DELETE FROM ${this._table} WHERE id=$1`;

      return this._query(query, [ id ]);
    }
  }

  /**
   * Finds a user.
   * @param {*} value - Specific value.
   * @param {*} field - Field tested.
   * @returns user or undefined if not found.
   */
  async findOne(value, field) {
    if (!value || !field) return;

    const query = `SELECT * FROM ${this._table} WHERE ${field}='${value}'`;
    const { rows } = await this._query(query);
    
    return rows[0];
  }

  /**
   * Saves the token of the user.
   * @param {*} id 
   * @param {*} token 
   */
  async saveToken(id, token) {
    if (!id || !token) return;

    const query = `UPDATE ${this._table} SET token='${token}' WHERE id='${id}'`;

    return this._query(query);
  }
}

export default User;
