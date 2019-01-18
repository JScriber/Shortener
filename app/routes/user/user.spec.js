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


  test('GET /user/login', done => {
    // Create the user.
    request(server).post('/user')
      .set('Content-Type', 'application/json')
      .send(johnDoe)
      .expect(201);

    // Login with this user.
    request(server).get('/login')
      .set('Content-Type', 'application/json')
      .send(johnDoe)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toBeDefined();
        expect(typeof body).toEqual(String);
      });
  });

  test('PUT /user', done => {

    // First credentials.
    const firstCredentials = {
      name: 'Testeur',
      password: 'first'
    };

    // Credentials updated.
    const updateCredentials = {
      name: 'Testeur',
      password: 'second'
    }

    request(server).post('/user')
      .set('Content-Type', 'application/json')
      .send(firstCredentials)
      .expect(201)
      .end(() => {
        // Get the token.
        request(server).get('/user/login')
          .set('Content-Type', 'application/json')
          .send(firstCredentials)
          .expect(200)
          .end((_, { body }) => {
            // Update the credentials.
            request(server).put('/user')
              .set('Content-Type', 'application/json')
              .set('Authorization', body)
              .send(updateCredentials)
              .expect(200)
              .end(done);
          });
      });
  });
  
  test('DELETE /:id', done => {

    // creation de l'utilisateur
    request(server).post('/user')
      .set('Content-Type', 'application/json')
      .send(johnDoe);

    // login de l'utilisateur
    const token = request(server).get('/login')
      .set('Content-Type', 'application/json')
      .send(johnDoe)
      .value();

    // suppression de l'utilisateur
    supertest(app).delete('/:' + token)
      .set('Content-Type', 'application/json')
      .set('Authorization', token)
      .expect(204, {})
      .end(done);
  });
});
