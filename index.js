'use strict';


const server = require('./src/server.js');
const mongoose = require('mongoose');
require('dotenv').config();

const options = {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true
}

mongoose.connect(process.env.MONGODB_URI, options)
  .then( () => {
    server.start(3000)
  })

