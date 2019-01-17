import Link from '../../database/link.database';
import { shortURL } from '../create/create';

export const listing = async filter => {
  // TODO: Implement filtering.

  // Get the instance fo the service.
  const service = await new Link().connect();
  const list = await service.getAll();

  return list.map(r => ({
    short: shortURL(r.hash),
    url: r.url,
    visits: r.visits
  }));
}
