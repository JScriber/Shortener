import jwt from 'jsonwebtoken';
import HTTPStatus from 'http-status-codes';

import { environment } from '../../environment';

/** Authentification handler. */
export const authentification = whitelist => {
  return (async (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (whitelist.find(e => e.method === req.method && e.path === req.path)) {
      console.log(`[AUTH] - ${req.path} is whitelisted.`);
      next();
    } else {
      if (token) {
        try {
          const decoded = await jwt.verify(token, environment.security.privateKey);
          req.user = decoded;
          next();
        } catch (e) {
          res.status(HTTPStatus.UNAUTHORIZED).send({ message: 'Fail to authentificate.'});
        }
      } else {
        return res.status(HTTPStatus.UNAUTHORIZED).send({ 
          message: 'Missing token.' 
        });
      }
    }
  });
};
