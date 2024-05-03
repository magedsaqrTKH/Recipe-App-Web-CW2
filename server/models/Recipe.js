const mongoose = require('mongoose');

const recipesSchema = new mongoose.Schema({
    id: String,
    title: {type: String,required: true,trim: true},
    image: String,
    cuisines: {type: Array,required: true,trim: true},
    ingredients: [{name: String,quantity: String }],
    instructions: String,
    cookingTime: {type: Number},
    ratings: {averageRating: Number},
    price: {type: Number}
});

const Recipe = mongoose.model('Recipe', recipesSchema);
module.exports = Recipe;
