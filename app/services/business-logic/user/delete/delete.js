import HTTPStatus from 'http-status-codes';

import User from '../../../database/user.database';

/** Deletes the user from the database. */
export const remove = async ({ params: { id }}, res, next) => {
  id = +id;

  if (Number.isInteger(id)) {
    const database = await new User().connect();

    try {
      await database.deleteOne(id);
      res.sendStatus(HTTPStatus.OK);
    } catch (err) {
      next(err);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
};
