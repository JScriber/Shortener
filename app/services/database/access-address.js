import { environment } from '../../../environment';

const { domain, port, user, password, database } = environment.database;

export const SERVER = `postgres://${user}:${password}@${domain}:${port}/${database}`;
