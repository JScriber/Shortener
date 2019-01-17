import express from 'express';
import HTTPStatus from 'http-status-codes';

import { generateHash, shortURL } from '../services/business-logic/create/create';

/** Short link creation. */
const createRoute = express.Router();

createRoute.post('/', async ({ body: { url } }, res, next) => {
  if (url) {
    try {
      const hash = await generateHash(url);
      res.status(HTTPStatus.CREATED).json(shortURL(hash));
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
});

export default createRoute;
