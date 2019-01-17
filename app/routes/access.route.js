import express from 'express';
import HTTPStatus from 'http-status-codes';

import { accessLink } from '../services/business-logic/access/access';

/** Short link access. */
const accessRoute = express.Router();

accessRoute.get('/:hash', async (req, res, next) => {
  const hash = req.params.hash;

  if (hash) {
    try {
      // Requested url.
      const url = await accessLink(hash);
  
      url ? res.redirect(url)
          : res.sendStatus(HTTPStatus.NOT_FOUND);
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
});

export default accessRoute;
