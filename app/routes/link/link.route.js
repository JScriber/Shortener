import express from 'express';

import  { access, generate, listing, remove } from '../../services/business-logic/link/index';

const linkRoute = express.Router();

/** Access to URL. */
linkRoute.get('/:hash', access);

/** Create a link. */
linkRoute.post('/', generate);

/** URL deletion. */
linkRoute.delete('/:hash', remove);

/** URL listing. */
linkRoute.get('/', listing);

export default linkRoute;
