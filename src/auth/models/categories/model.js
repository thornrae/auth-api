'use strict';
const mongoose = require('mongoose');
// require('mongoose-schema-jsonschema')(mongoose);

const categorySchema = mongoose.Schema({
  categoryName: { type: String, required: true },
  normalizedName: { type: String, required: true },
  displayName: { type: String },
  description: { type: String },
});

const categoriesModel = mongoose.model('categories', categorySchema)

module.exports = categoriesModel;