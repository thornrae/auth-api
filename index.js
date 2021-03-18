'use strict';


const server = require('./src/server.js');
const mongoose = require('mongoose');
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true
}

// console.log(server);
// server.start(3000);

mongoose.connect('mongodb://localhost:27017/authapi', options)
  .then( () => {
    server.start(3000)
  })

