var mongoose = require("mongoose");
var RecipeSchema = new mongoose.Schema({
  name: {
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

const Userrecipes = mongoose.model('Userrecipes', RecipeSchema);
module.exports =Userrecipes;