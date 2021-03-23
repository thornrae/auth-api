'use strict';
//make these my login routes

const express = require('express');
const authRouter = express.Router()

const User = require('../models/users.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const permissions = require('../middleware/acl.js');


authRouter.post('/signup', async (req, res) => {
  let user = new User(req.body);
  // console.log(user);
  const record = await user.save();
  res.status(201).json(record);
})

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user, 
    token: req.user.token
  };
  res.status(200).json(user);
})

authRouter.get('/secret', bearerAuth, async (req, res, next) => {
  res.status(200).send('Welcome to the secret area');  
})


authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  const users = await User.find({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
})

module.exports = authRouter;

