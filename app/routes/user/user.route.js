import express from 'express';

import { authentification } from '../../middleware/auth';
import { create, login, remove } from '../../services/business-logic/user/index';

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

/** Creates a user. */
userRoute.post('/', create);

/** Generate an access token. */
userRoute.get('/login', login);

/** Deletes the user. */
userRoute.delete('/:id', remove);

export default userRoute;
