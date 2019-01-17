import Link from '../../database/link.database';

export const deleteLink = async hash => {
  // Get the instance of the service.
  const service = await new Link().connect();

  if (await service.exist(hash, 'hash')) {
    try {
      await service.delete(hash);

      return true;
    } catch (e) {
      return false;
    }
  }

  return false;
};
