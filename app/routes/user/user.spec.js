import request from 'supertest';
import { Client } from 'pg';

import server, { closeServer } from '../../app';
import { SERVER } from '../../services/database/access-address';

describe('users', async () => {
  const client = new Client(SERVER);
  await client.connect();

  /** Closes the server. */
  afterAll(closeServer);

  beforeEach(async () => {
    await client.query('DELETE FROM s_user');
  });

  test('POST /user', done => {
    const johnDoe = {
      name: 'John De',
      password: 'Secure password'
    };

    // First try.
    request(server).post('/user')
      .set('Content-Type', 'application/json')
      .send(johnDoe)
      .expect(201)
      .end(done);

    // Should ask for another name.
    request(server).post('/user')
      .set('Content-Type', 'application/json')
      .send(johnDoe)
      .expect(500)
      .end(done);
  });

  
});
