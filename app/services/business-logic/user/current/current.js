/** Informations on the current user. */
export const current = ({ user }, res) => res.send({ name: user.name });
