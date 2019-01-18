import HTTPStatus from 'http-status-codes';

/** Informations on the current user. */
export const current = ({ user }, res) => {
  user ? res.send({ name: user.name })
      : res.sendStatus(HTTPStatus.UNAUTHORIZED);
};
