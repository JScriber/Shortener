import HTTPStatus from 'http-status-codes';

import Link from '../../../database/link.database';
import { fullURL } from '../create/create';

export const listing = async ({ query }, res, next) => {
  const { name } = query;

  // Get the instance fo the service.
  const service = await new Link().connect();
  let list = await service.getAll();

  // TODO: Apply the filtering directly in the request for performance improvement.
  if (name) list = list.filter(l => l.url.indexOf(name) !== -1);

  // Conversion of the rows.
  const rows = list.map(r => ({
    short: fullURL(r.hash),
    url: r.url,
    visits: r.visits
  }));

  res.status(HTTPStatus.OK).send(rows);
}
