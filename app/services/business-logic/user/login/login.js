import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import HTTPStatus from 'http-status-codes';

import User from '../../../database/user.database';
import { environment } from '../../../../../environment';
import { checkCredentials } from '../utils/utils';

/**
 * Generates a token.
 * @param {*} name
 * @param {*} password 
 * @param {*} salt
 */
export const genToken = (id, name, salt) => jwt.sign(
  { id, name, salt },
  environment.security.privateKey,
  { expiresIn: environment.security.expiration }
);

/** Login a user. */
export const login = async ({ body: { name, password }}, res, next) => {
  if (checkCredentials(name, password)) {
    if (!name || !password) return;

    // Database access instance.
    const database = await new User().connect();
    // Find the user by name.
    const user = await database.findOne(name, 'name');

    if (user) {
      // Make a new hash to compare it.
      const hash = await bcrypt.hash(password, user.salt);

      if (hash === user.password) {
        // Generate a new token.
        const token = genToken(user.id, name, user.salt);

        try {
          // Assign the new token and return it.
          await database.saveToken(user.id, token);

          res.status(HTTPStatus.OK).send(token);
        } catch (e) {
          next(e);
        }
      } else {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
      } // ! Hash test.
    } else {
      res.sendStatus(HTTPStatus.BAD_REQUEST);
    } // ! Retrieve user.
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  } // ! Check parameters.
};
