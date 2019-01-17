import express from 'express';
import HTTPStatus from 'http-status-codes';
import { listing } from '../services/business-logic/list/list';

/** Short link access. */
const listingRoute = express.Router();

listingRoute.get('/', async (req, res, next) => {

  try {
    const rows = await listing();
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

export default listingRoute;
