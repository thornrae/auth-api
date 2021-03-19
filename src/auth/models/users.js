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

users.virtual('token').get(function () {
  let tokenObject = {
    username: this.username,
  }
  return jwt.sign(tokenObject, process.env.SECRET);
})

users.virtual('capabilities').get(function () {
  let acl = {
    user: ['read'],
    editor: ['read', 'create', 'update'],
    admin: ['read', 'create', 'update', 'delete']
  };
  return acl[this.role];
})

//before we save, run this code:
users.pre('save', async function () {
  // if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this.password);
  // }
});

//_asynchronous
//_statics are like standalone methods, invoked when needed, not everytime
//_
users.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username })
  const valid = await bcrypt.compare(password, user.password)
  if(valid) { return user; }
  throw new Error('Invalid User');
}

users.statics.authenticateWithToken = async function (token) {
  try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = this.findOne({username: parsedToken.username})
      if(user) { return user;}
      throw new Error('User Not Found')
  } catch (e) {
    throw new Error(e.message)
  }
}

module.exports = mongoose.model('users', users) //(Collection Name, name of your schema)