import request from 'supertest';
import { Client } from 'pg';

import server, { closeServer } from '../../app';
import { SERVER } from '../../services/database/access-address';

describe('users', async () => {
  const client = new Client(SERVER);
  await client.connect();

  const johnDoe = {
    name: 'John De',
    password: 'Secure password'
  };

  /** Closes the server. */
  afterAll(closeServer);

  beforeEach(async () => {
    await client.query('DELETE FROM s_user');
  });

  test('POST /user', done => {
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


  test('GET /login', done => {

    request(server).get('/login')
      .send(johnDoe)
      .expect()
  });
  
  // yannoel

  test('DELETE /:id', done => {

    // creation de l'utilisateur
    request(server).post('/user')
      .set('Content-Type', 'application/json')
      .send(johnDoe);

    // login de l'utilisateur
    let token = request(server).get('/login')
      .send(johnDoe)
      .value();

    // suppression de l'utilisateur
    supertest(app).delete('/:' + token)
      .set('Authorization', token)
      .expect(204, {})
      .end(done);

  })
  
});
