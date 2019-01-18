import HTTPStatus from 'http-status-codes';

import User from '../../../database/user.database';
import { checkCredentials } from '../utils/utils';

/** Deletes the user from the database. */
export const update = async ({ body: { name, password }, user }, res, next) => {

  if (checkCredentials(name, password)) {
    const currentUserID = user.id;

    // Generate the new password.
    const hash = await bcrypt.hash(password, user.salt);
    const database = await new User().connect();

    try {
      await database.put(currentUserID, name, hash);
      res.sendStatus(HTTPStatus.OK);
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
};
