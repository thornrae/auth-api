'use strict';

const server = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('**** AUTH API SERVER ****', () => {
  //test that POST/signup creates a new user & sends object with user and the token back to the client
    it('should create new user & send back user object w/ token to the client', async () => {
      let user = {
        username: 'testuser',
        password: 'testpassword'
      }

    const results =  await mockRequest.post('/signup').send(user)
        expect(results.username).toBe(user.username)
    })

  //test that POST/signin, with basic authentication headers, logs in a user and sends an object with the use rand the token to the client 

  //V1 Routes: 
  //_POST/api/v1/:model adds an item to the DB and returns an object with the added item

  //GET/api/v1/:model return a list of :model items

  //GET/api/v1/:model/ID returns a sigle item by ID

  //PUT/api/v1/:model/ID returns an empty object.  Subsquent GET for the same ID should result in nothing found

  //V2 ROUTES: 
  //POST/api/v2/:model with a bearer token that has 'create' permissions adds an item to the DB and returns an object with the added item

  //GET/api/v2/:model with a bearer token thta has 'read' permissions returns a list of :model items

  //GET/api/v2/:model/ID with a bearer token that has read permissions returns a single item by ID

  //PUT/api/v2/:model/ID with a bearer token that has 'update' permissions returns a signle, updated item by ID

  //DELETE/api/v2:model/ID with a bearer token that has 'delete' permissions returns an empty object. Subsequent GET for the same ID should result in nothing found  

})
