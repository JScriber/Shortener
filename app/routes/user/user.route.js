import express from 'express';

import { authentification } from '../../middleware/auth';
import { create, login, remove, update, current } from '../../services/business-logic/user/index';

const userRoute = express.Router();

/** Authentification middleware. */
userRoute.use(authentification([
  {
    method: 'GET',
    path: '/login'
  },
  {
    method: 'POST',
    path: '/'
  }
]));

/** Creates the user. */
userRoute.post('/', create);

/** Generate an access token. */
userRoute.get('/login', login);

/** Deletes the user. */
userRoute.delete('/:id', remove);

/** Updates the user. */
userRoute.put('/', update);

/** Informations on current user. */
userRoute.get('/current', current);

export default userRoute;
