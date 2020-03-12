var mongoose = require("mongoose");
var authz = require('mongoose-authorization');
var bcrypt = require("bcrypt");
const RecipeSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Ingredients: {
    type: String,
  },
  Instructions: {
    type: String,
  },
  isPublic: { 
    type: Boolean, default: false 
  },
  isPrivate: {
    type: Boolean, default: true
  }
});



const Userrecipes = mongoose.model('Userrecipes', RecipeSchema);
module.exports =Userrecipes;