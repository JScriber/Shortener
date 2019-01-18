import express from 'express';
import HTTPStatus from 'http-status-codes';

import * as Link from '../../services/business-logic/link/index';

const linkRoute = express.Router();

/** Access to URL. */
linkRoute.get('/:hash', async (req, res, next) => {
  const hash = req.params.hash;

  if (hash) {
    try {
      // Requested url.
      const url = await Link.access(hash);
  
      url ? res.redirect(url)
          : res.sendStatus(HTTPStatus.NOT_FOUND);
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
});

/** Create a link. */
linkRoute.post('/', async ({ body: { url } }, res, next) => {
  if (url) {
    try {
      const hash = await Link.generate(url);
      res.status(HTTPStatus.CREATED).json(Link.fullURL(hash));
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
});

/** URL deletion. */
linkRoute.delete('/:hash', async ({ params }, res, next) => {
  const { hash } = params;

  if (hash) {
    try {
      const success = await Link.remove(hash);

      success ? res.sendStatus(HTTPStatus.NO_CONTENT)
              : res.sendStatus(HTTPStatus.NOT_FOUND);
    } catch (e) {
      next(e);
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
});

/** URL listing. */
linkRoute.get('/', async ({ query }, res, next) => {
  const { name } = query;

  try {
    const rows = await Link.listing(name);
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

export default linkRoute;
