import express from 'express';
import { listing } from '../services/business-logic/list/list';

/** Short link access. */
const listingRoute = express.Router();

listingRoute.get('/', async ({ query }, res, next) => {
  const { name } = query;

  try {
    const rows = await listing(name);
    res.send(rows);
  } catch (e) {
    next(e);
  }
});

export default listingRoute;
