'use strict';

const fs = require('fs');
const express = require('express');
const Collection = require('../models/data-collection.js');

const router = express.Router();

const models = new Map();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    }
    else {
      next("Invalid Model");
    }
  }
});

//_^^I NEED EXPLANATION OF THIS LINE BY LINE
//_^^ BUT, whatever is going on here is making it so that the "model" is dynamic in that it can be used to genereate both the clothes and the food routes

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);
//_^^non authentication routes

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
//_^^ asynchronous function that assigns, req.model when it invokes the .get method, to allRecords
//_^^ returns all records and status 200 to user

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id)
  res.status(200).json(theRecord);
}
//_^^ asynchronous function, that takes the id off of the req.params and assigns it to memory in a variable called id
//_^^ uses the req.model object to invoke the .get function to pass thru the id
//_^^ returns record to user

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}
//_^^ this function create a new object/user
//_^^ assign the req.body object to a variable obj so that it can be referenced
//_^^ use req.model to invoke the create function and pass in the stored obj
//_^^ return newRecord to use 

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}
//_^^update function
//_^^ assigns req.params.id to a const id
//_^^ assigns req.body to const obj
//_^^passes id and obj thru update function with is invoked thru chaining to the req.model object 

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}


module.exports = router;

