import jwt from 'jsonwebtoken';

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
        } catch (e) {
          res.json({ message: 'Fail to authentificate.'});
        }
    
        next();
      } else {
        return res.status(403).send({ 
          message: 'Missing token.' 
        });
      }
    }
  });
};
