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
 
 const {name, description, image, ingredients, methods} = req.body;

 Recipe.create({name, description, image, ingredients, methods})
  
  /*
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
  */
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


// GET route => to get a specific recipe (from overview)
router.get('/recipes/:id', (req, res) => {
  const {id} = req.params // desctricture params

  if(!mongoose.Types.ObjectId.isValid(id)){
    res
      .status(400)
      .json({message: 'Invalid ID'})
  }  // basic check so database canÄt eb overloaded
 
 
  Recipe.findById( id ).populate('user')
    .then(foundRecipes => {
      res.json(foundRecipes);
    })
    .catch((err) => {
      res
        .status(500)
        .json(err)
    })
});

// GET route of see edit form of a specific recipe
router.get('/add/:id', (req, res) => {
  const {id} = req.params // desctricture params

  if(!mongoose.Types.ObjectId.isValid(id)){
    res
      .status(400)
      .json({message: 'Invalid ID'})
  }  // basic check so database canÄt eb overloaded
 
 
  Recipe.findById( id ).populate('user')
    .then(foundRecipes => {
      res.json(foundRecipes);
    })
    .catch((err) => {
      res
        .status(500)
        .json(err)
    })
});

// PUT route  to save edited recipe to backend 

router.put('/add/:id', (req, res) => {
  
  const {id} = req.params // desctricture params

  const {creator, name, description, images, tags, comments, yield, ingredients, methods} = req.body; // 1st-level destructuring
  const {diet, type, cuisine, mainIngredients} = tags;
  const {commentcreator, text}= comments;
  const {quantityPrimary, unitPrimary, quantitySecondary, unitSecondary} = yield;
  const {ingredientname, quantity, unit, prep, comment, category} = ingredients;

  Recipe.findByIdAndUpdate(id, req.body)

  /*Recipe.create({
    name, description, images: [], diet, type, cuisine, mainIngredients: [], comments: [{commentcreator, text}],
    quantityPrimary, unitPrimary, quantitySecondary, unitSecondary, 
    ingredients: [{ingredientname, quantity, unit, prep, comment, category}],
    method: []
  })  */
    
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



// DELETE '/api/projects/:id'   => to delete a specific project

router.delete('/add/:id', (req, res) =>{
  const {id} = req.params // desctricture params
  
  if(!mongoose.Types.ObjectId.isValid(id)){
    res
      .status(400)
      .json({message: 'Invalid ID'})
  }  // basic check so database canÄt eb overloaded

Recipe.findByIdAndRemove(id) // req.body is the updatethat is send with the put request
  .then(()=> {
    res
      .status(204)
      .json({message: 'Project Deleted'})
  })
  .catch ((err)=> {
    res
      .status(500)
      .json(err)
  })

})


module.exports = router;