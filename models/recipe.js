const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
 creator: {type: Schema.Types.ObjectId, ref: 'User'},
 name: String,
 description: String,
 images: [],
 tags: {
  diet: {type: String, enum: ['Keto', 'Low-Carb', 'High-Protein', 'Vegan', 'Vegetarian']},
  component: String,
  type: String,
  cuisine: String,
  mainIngredients: []
  },
 comments: [{
  commentcreator: {type: Schema.Types.ObjectId, ref: 'User'},
  text: String,
 // timestamps: {
  //  createdAt: 'created_at',
 //   updatedAt: 'updated_at'
 // }
  }],
yield: {
    quantityPrimary: Number,
    unitPrimary: String,
    quantitySecondary: Number,
    unitSecondary: String
    },
ingredients: [{
  ingredientname: String,
  quantity: Number,
  unit: String,
  prep: String,
  comment: String,
  category: {type: String, enum: ['Veg', 'Meat', 'Poultry', 'Fish', 'Pantry']},
   }],
methods: [],
// timestamps: {
 // createdAt: 'created_at',
 // updatedAt: 'updated_at'
//}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;