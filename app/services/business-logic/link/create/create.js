import crypto from 'crypto';
import HTTPStatus from 'http-status-codes';

import { instance } from '../../../../app';
import Link from '../../../database/link.database';
import { environment } from '../../../../../environment';

export const generate = async ({ body: { url } }, res, next) => {
  if (url && /http(s)?:\/\/.+\..+/.test(url)) {
    // Service to manipulate links in database.
    const service = await new Link().connect();

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
        next(e);
      }
    } else {
      hash = link.hash;
    }

    res.status(HTTPStatus.CREATED).json(fullURL(hash));
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
}

/**
 * Returns the address to call to visit the website.
 * @param {*} hash
 * @returns address to visit.
 */
export const fullURL = hash => {
  const ip = instance.address().address || environment.ip;
  
  return `http://${ip}:${environment.port}/link/${hash}`;
}
