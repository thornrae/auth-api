'use strict';


//404 error which is exported as middleware (signature)

module.exports = (req, res, next) => {
  let errorObj = { 
    status: 404,
    message: 'That\'s a no from me dawg'
  }
  res.status(404).json(errorObj);
}