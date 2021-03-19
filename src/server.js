'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const notFoundHandler = require('./auth/error-handlers/404.js');
const errorHandler = require('./auth/error-handlers/500.js');

const authRoutes = require('./auth/routes/auth-routes.js');
// const apiRoutes = require('./auth/routes/api-routes.js');



// app.use(cors());
// app.use(morgan('dev'));

// app.use(express.json());

app.use(authRoutes);
// app.use(apiRoutes);

app.use('*', notFoundHandler)
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`)
    });
  },
};
