import Link from '../../database/link.database';

/**
 * Returns the corresponding url of the hash.
 * @param {*} hash
 * @returns url or never (may raise an exception)
 */
export const accessLink = async hash => {
  if (!hash) return;

  // Get the instance fo the service.
  const service = await new Link().connect();

  // Url of the link we want to access.
  const url = await service.get(hash);

  // Mark the link as visited.
  await service.visit(url);

  return url;
};
