var mongoose = require("mongoose");
var authz = require('mongoose-authorization');
var bcrypt = require("bcrypt");
var RecipeSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Ingredients: {
    type: String,
  },
  Instructions: {
    type: String,
  }
});

RecipeSchema.permissions = {
  defaults: {
    read: ['Title', 'Ingredients', 'Instructions']
  },
  admin: {
    read: ['status'],
    write: ['status'],
    create: true,
    remove: true
  },
  owner: {
    read: ['status'],
    write: ['Title', 'Ingredients', 'Instructions'],
    create: true,
    remove: true
  }
};

const Userrecipes = mongoose.model('Userrecipes', RecipeSchema);
module.exports =Userrecipes;