'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');

module.exports = async (req, res, next) => {
  // console.log('req.headers.auth', req.headers.authorization);
  if (!req.headers.authorization) { return _authError(); }
  //_^^ check that req.headers.authorization exists, if it does not return error
  let basic = req.headers.authorization.split(' ').pop();
  //_^^ take req.headers.authorization (which is going to be the username and password base64 encoded and sent back as Basic alsdkjf:alkdsjf)
  //_^^ split at the space pop second item in array which is alsdkjf:alkdsjf
  let [user, pass] = base64.decode(basic).split(':')
  //_^^split alsdkjf:alkdsjf as the colon, base64 decode and store each element in a destructured array where index 0 is the user and index 1 is the password

  try {
    req.user = await User.authenticateBasic(user, pass)
    //_^^ pass the user and pass garnered from line 13 and pass thru authenticateBasic function in users model
    //_^^ if function returns true, store user and pass in req.user
    next();
    //_^go on to next function
  } catch (e) {
    _authError()
    //_^^ invoke error function info
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }
  
}