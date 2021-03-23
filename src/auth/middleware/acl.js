'use strict';


//curried function that takes capability as a parameter and uses it within the middleware function (see signature)
module.exports = (capability) => {
  
  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        //_^^ if capabilities of user includes the capability that is being passed in - go on the step in the route
        next();
      }
      else {
        next('Access Denied');
        //_^^otherwise, access denied
      }
    } catch (e) {
      next('Invalid Login');
      //_^if error, pass parameter in to next() to trigger error 
    }
  }
}