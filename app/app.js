import express from 'express';
import HTTPStatus from 'http-status-codes';

// Environment variables.
import { environment } from '../environment';

// All routes.
import linkRoute from './routes/link/link.route';
import userRoute from './routes/user/user.route';

// Server instance.
const server = express();

// Support for JSON encoded body.
server.use(express.json());

// Error handler.
server.use((err, req, res, next) => res.sendStatus(HTTPStatus.INTERNAL_SERVER_ERROR).json(err));

// Route definition.
server.use('/link', linkRoute);
server.use('/user', userRoute);

const initialized = () => console.log(`Server initialized on port ${environment.port}`);
const listener = server.listen(environment.port, initialized);

// Exports.
export default server;
export const closeServer = listener.close;
