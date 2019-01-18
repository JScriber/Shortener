import Link from '../../database/link.database';
import { shortURL } from '../create/create';

export const listing = async name => {
  // Get the instance fo the service.
  const service = await new Link().connect();
  let list = await service.getAll();

  // TODO: Apply the filtering directly in the request.
  if (name) list = list.filter(l => l.url.indexOf(name) !== -1);

  return list.map(r => ({
    short: shortURL(r.hash),
    url: r.url,
    visits: r.visits
  }));
}
