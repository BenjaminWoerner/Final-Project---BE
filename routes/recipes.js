const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

const router  = express.Router();

// GET route => to get all the recipes
router.get('/recipes', (req, res, next) => {
  Recipe.find().populate('user')
    .then(allTheRecipes => {
      res.json(allTheRecipes);
    })
    .catch((err) => {
      res
        .status(500)
        .json(err)
    })
});

// POST route => post a new recipe

router.post('/add', (req, res) => {
  


  const {creator, name, description, images, tags, comments, yield, ingredients, methods} = req.body; // 1st-level destructuring
  const {diet, type, cuisine, mainIngredients} = tags;
  const {commentcreator, text}= comments;
  const {quantityPrimary, unitPrimary, quantitySecondary, unitSecondary} = yield;
  const {ingredientname, quantity, unit, prep, comment, category} = ingredients;

  Recipe.create({
    name, description, images: [], diet, type, cuisine, mainIngredients: [], comments: [{commentcreator, text}],
    quantityPrimary, unitPrimary, quantitySecondary, unitSecondary, 
    ingredients: [{ingredientname, quantity, unit, prep, comment, category}],
    method: []
  }) 
    
  .then((response)=> {
      res
        .status(201) 
        .json(response) 
        
    })
    .catch((err)=> {
      res
        .status(500)
        .json(err)
    })
    
})


module.exports = router;