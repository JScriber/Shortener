import bcrypt from 'bcrypt';
import HTTPStatus from 'http-status-codes';

import User from '../../../database/user.database';
import { environment } from '../../../../../environment';
import { checkCredentials } from '../utils/utils';

/**
 * Encrypts the given password.
 * @param {*} password
 */
export const encrypt = async (password) => {
  const salt = await bcrypt.genSalt(environment.security.hashRound);
  const hash = await bcrypt.hash(password, salt);

  return { salt, hash };
}

/** Creates a user. */
export const create = async ({ body: { name, password } }, res, next) => {
  if (checkCredentials(name, password)) {
    const database = await new User().connect();
    const { hash, salt } = await encrypt(password);

    try {
      await database.post({ name, hash, salt });
      res.sendStatus(HTTPStatus.CREATED);
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
};
