'use strict';
const mongoose = require('mongoose');
// require('mongoose-schema-jsonschema')(mongoose);

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  category: { type: String, required: true },
  inStock: { type: Number, required: true },
  imageUrl: {type: String, required: true},
});

const productsModel = mongoose.model('products', productSchema)

module.exports = productsModel;
