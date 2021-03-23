'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //hash a plain text pw and compare a hashed pw against a plain text pw
const jwt = require('jsonwebtoken');  //thing we use for creation (sign) of a jwt and verification (verify) of a jwt
require('dotenv').config();

const users = new mongoose.Schema( {
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  role: { type: String, required: true, default: 'user', enum: ['user', 'editor', 'admin'] },
}, { toJSON: { virtuals: true }} );

//_^ users model. has username, password and role properties and the ability to create virtuals which is how we will add token & capabilities property to user object
users.virtual('token').get(function () {
  //_^ each time users model is instantiated, create virtual field with property name token
  let tokenObject = {
    username: this.username,
    //_^define username as this.username
  }
  return jwt.sign(tokenObject, process.env.SECRET);
  //_^ return token using jwt.sign method with takes in the tokenObject (username) and app SECRET to create unique token for user
  //_^ the users "role" will determine what routes the user has access to and will be reflected in the token
})

users.virtual('capabilities').get(function () {
  //_^create virtual field called capabilities
  let acl = {
    user: ['read'],
    editor: ['read', 'create', 'update'],
    admin: ['read', 'create', 'update', 'delete']
  };
  //_^ create acl object with string to represent how each role is able to interact with the app
  return acl[this.role];
  //_^ return the acl property that your users instance matches to. 
})

//PREHOOK
users.pre('save', async function () {
  //_^ before you SAVE this instance of a user to the DB, 
    this.password = await bcrypt.hash(this.password, 10);
  //_^ invoke bcrypt.hash method, pass in the user's password and saltx10.
  //_^ then, assign the results to this.password, which is a property in the users object
  //_then store in DB
    console.log(this.password);
});

//_asynchronous
//_statics are like standalone methods, invoked when needed, not everytime
//_
users.statics.authenticateBasic = async function (username, password) {
  //^this function gets called when a user hits the /signin route
  const user = await this.findOne({ username })
  //_^ use .findOne in the instantiation of user, to search the DB for the username that is passed in that we got from base64 DECODING
  //_^if found, store entire record associated with that username in the variable, user
  const valid = await bcrypt.compare(password, user.password)
  // user is an object that has properties based on the user schema so there is a password in there which user.password is referencing. password is in reference to the password that is being passed as an argument in this function which we get from base64 DECODING
  //_^ then, bcrypt.compare checks these two passwords against eachother and if they match, will return true 
  if(valid) { return user; }
  //_^if valid evaluates to true, return the user object
  throw new Error('Invalid User');
  //)__^ otherwise throw an error 
}

users.statics.authenticateWithToken = async function (token) {
  //_^ this is used to make sure that a users token has the requirement permissions to access whatever route or part of the site they are seeking
  try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      //_^ the users token that was created, is verified against the app's secret using jwt.verify method
      const user = this.findOne({username: parsedToken.username})
      //_^ then, we want to find any user in the database, who has a username that includes the username property of the parsedToken object
      if(user) { return user;}
      //_^ if user evaluates to true, return the user object
      throw new Error('User Not Found')
      //_^ otherwise, throw error
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = mongoose.model('users', users) //(Collection Name, name of your schema)