import Database from './database';

class Link extends Database {

  constructor() {
    super();

    this._table = 'link';
  }

  /**
   * Adds a link in the database.
   * @param {*} link
   * @param {*} hash
   */
  async add(link, hash) {
    if (!(link && hash)) return;
    const query = `INSERT INTO ${this._table}(hash, url, visits) VALUES ($1, $2, $3)`;

    return this._query(query, [ hash, link, 0 ]);
  }

  /**
   * Get the corresponding link in the database.
   * @param {*} hash 
   */
  async get(hash) {
    if (!hash) return;

    const query = `SELECT url FROM ${this._table} WHERE hash=$1`;

    try {
      const { rows } = await this._query(query, [ hash ]);
      return rows[0].url;
    } catch (e) {
      return ;
    }
  }

  /**
   * Returns all the entries.
   * @param {*} filter
   */
  async getAll(filter) {
    const query = `SELECT * FROM ${this._table} ORDER BY visits DESC`;
    const { rows } = await this._query(query);

    return rows;
  }

  /**
   * Adds a visit to the given link.
   * @param {*} url 
   */
  async visit(url) {
    if (!url) return;
    const query = `UPDATE ${this._table} SET visits=visits + 1 WHERE url=$1`;

    return this._query(query, [ url ]);
  }

  /**
   * Says if the link exist.
   * @param {*} value - Either url or hash.
   * @param {'url' | 'hash'} attribute
   * @returns the link or undefined.
   */
  async exist(value, attribute) {
    // Secures parameters.
    if (!value || !(attribute === 'url' || attribute === 'hash')) return;

    const query = `SELECT hash FROM ${this._table} WHERE ${attribute}=$1`;
    
    const { rows } = await this._query(query, [ value ]);

    return rows[0];
  }

  /**
   * Deletes a link in the database.
   * @param {*} hash 
   */
  async delete(hash) {
    if (!hash) return;

    const query = `DELETE FROM ${this._table} WHERE hash=$1;`;
    return this._query(query, [ hash ]);
  }
}

export default Link;
