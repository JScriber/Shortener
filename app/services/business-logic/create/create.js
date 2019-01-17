import crypto from 'crypto';
import os from 'os';

import Link from '../../database/link.database';
import { environment } from '../../../../environment';
import { errors } from '../../../../errors';

/**
 * Generates a hash with the url and persist it.
 * @param {*} url
 * @return hash
 */
export const generateHash = async url => {
  // Service to manipulate links in database.
  const service = await new Link().connect();

  if (/http(s)?:\/\/.+\..+/.test(url)) {
    // Hashes url.
    let hash = crypto.createHash('md5')
      .update(url)
      .digest('hex');

    // Existing rows in the database.
    const link = await service.exist(url, 'url');

    if (!link) {
      try {
        await service.add(url, hash);
      } catch(e) {
        throw errors.persistEntity;
      }
    } else {
      hash = link.hash;
    }

    return hash;
  } else {
    throw errors.incorrectUrl;
  }
}

/**
 * Returns the address to call to visit the website.
 * @param {*} hash
 * @returns address to visit.
 */
export const shortURL = hash => {
  // TODO: Improve for real usage on prod server.
  const ip = os.networkInterfaces()['lo'][0].address || 'localhost';

  return `http://${ip}:${environment.port}/l/${hash}`;
}
