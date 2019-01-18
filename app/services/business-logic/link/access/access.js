import HTTPStatus from 'http-status-codes';

import Link from '../../../database/link.database';

export const access = async (req, res, next) => {
  const hash = req.params.hash;

  if (hash) {
    try {
      // Get the instance fo the service.
      const database = await new Link().connect();

      // Url of the link we want to access.
      const url = await database.get(hash);

      // Mark the link as visited.
      await database.visit(url);
  
      url ? res.redirect(url)
          : res.sendStatus(HTTPStatus.NOT_FOUND);
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
}