'use strict';


const server = require('./src/server.js');
const mongoose = require('mongoose');
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true
}

mongoose.connect('mongodb://localhost:27017/authapi', options)
  .then( () => {
    server.start(3000)
  })

