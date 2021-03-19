'use strict';
//make these my login routes

const express = require('express');
const auth = express.Router()

const User = require('../models/users.js');
const basicAuth = require('../middleware/basic.js');


auth.post('/signup', async (req, res) => {
  let user = new User(req.body);
  console.log(user);
  const record = await user.save();
  res.status(201).json(record);
})

module.exports = auth;

