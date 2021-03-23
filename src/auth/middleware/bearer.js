'use strict';

const users = require('../models/users.js');
//_^ bring in users model

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { _authError()}
    //_^check that req.headers.authorization has a value

    const token = req.headers.authorization.split(' ').pop();
    //_^split req.headers.authorization at the space (Bearer  alkdjfaaskldfjlaks)
    const validUser = await users.authenticateWithToken(token);
    //_^ pass the token as a parameter in the authenticateWithToken function that is declared in the users model
    req.user = validUser;
    //_^ if autheticateWithToken returns true, store information in req.user
    req.token = validUser.token;
    //_^assign validUser.token (which is an object) to req.token
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    next('Invalid Login');
  }
}