import express from 'express';
import HTTPStatus from 'http-status-codes';

import { deleteLink } from '../services/business-logic/delete/delete';

/** Delete a link. */
const deleteRoute = express.Router();

deleteRoute.delete('/:hash', async ({ params }, res, next) => {
  const { hash } = params;

  if (hash) {
    try {
      const success = await deleteLink(hash);

      success ? res.sendStatus(HTTPStatus.NO_CONTENT)
              : res.sendStatus(HTTPStatus.NOT_FOUND);
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
});

export default deleteRoute;
