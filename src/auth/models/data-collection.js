'use strict';

// const model = require('./users.js');



class UserCollection {
//_^user collection model that decleares CRUD methods and the parameters needed to run the particular fundction. this is DYNAMIC

  constructor(model) {
    this.model = model;
  }
//_^ constructor allows use to dynamically pass in different models and use the CRUD methods below

  get(_id) {
    if(_id) {
      return this.model.findOne({_id});
      //_if the db _id passed into function is true, then return that single user 
    } else {
      //_^if no db _id is passed thru, return all users
      return this.model.find({});
    }
  }

  create(record) {
    let newRecord = new this.model(record);
    //_^ create a new instance of your model using info passed in it and assign to newRecord to save it in memory
    return newRecord.save();
    //_^save that variable to db using .save mongoose method
  }

  update(_id, record) {
    return this.model.findByIdAndUpdate(_id, record, { new: true });
    //_^ when given db _id and record object, find by _id and update with info being passed thru record
  }

  delete(_id){
    return this.model.findByIdAndDelete(_id);
    //_^ find this db_id and delete, return the deleted object 
  }
}

module.exports = UserCollection;