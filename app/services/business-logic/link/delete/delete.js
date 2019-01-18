import HTTPStatus from 'http-status-codes';

import Link from '../../../database/link.database';

export const remove = async ({ params }, res) => {
  const { hash } = params;

  if (hash) {
    // Get the instance of the service.
    const service = await new Link().connect();

    if (await service.exist(hash, 'hash')) {
      try {
        await service.delete(hash);
        res.sendStatus(HTTPStatus.NO_CONTENT)
      } catch (e) {
        res.sendStatus(HTTPStatus.NOT_FOUND);
      }
    }
  } else {
    res.sendStatus(HTTPStatus.BAD_REQUEST);
  }
}
