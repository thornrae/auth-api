'use strict';
//make these my login routes

const express = require('express');
const authRouter = express.Router()

const User = require('../models/users.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const permissions = require('../middleware/acl.js');


authRouter.post('/signup', async (req, res) => {
  //_^ sign up authentication route
  let user = new User(req.body);
  //_^use data passed thru req.body (username and password) to instantiate a new User using the user model and store in memory as user
  const record = await user.save();
  //_^ save user to database and store in memory as const record
  res.status(201).json(record);
  //_^return record to user
})

authRouter.post('/signin', basicAuth, (req, res, next) => {
  //_^ signin authentication route with basicAuth function as middleware
  const user = {
    user: req.user, 
    token: req.user.token
  };
  //_^ req.user is an object created as a result of the basic middleware function
  //_^ token is a property of the req.user function. it is a virtual so it is not stored in our database -- CAN SOMEONE CONFIRM THIS
  res.status(200).json(user);
})

// authRouter.get('/secret', bearerAuth, async (req, res, next) => {
//   res.status(200).send('Welcome to the secret area');  
// })


// authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
//   const users = await User.find({});
//   const list = users.map(user => user.username);
//   res.status(200).json(list);
// })

module.exports = authRouter;

