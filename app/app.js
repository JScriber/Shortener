import express from 'express';
import HTTPStatus from 'http-status-codes';

// Environment variables.
import { environment } from '../environment';

// All routes.
import accessRoute from './routes/access.route';
import createRoute from './routes/create.route';
import deleteRoute from './routes/delete.route';
import listingRoute from './routes/listing.route';

// Server instance.
const server = express();

// Support for JSON encoded body.
server.use(express.json());

// Error handler.
server.use((err, req, res, next) => res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR).json(err));

// Route definition.
server.use('/l', accessRoute);
server.use('/create', createRoute);
server.use('/delete', deleteRoute);
server.use('/list', listingRoute);

const initialized = () => console.log(`Server initialized on port ${environment.port}`);
const listener = server.listen(environment.port, initialized);

// Exports.
export default server;
export const closeServer = listener.close;
