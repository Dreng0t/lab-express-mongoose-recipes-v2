const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', (req, res, next) => {

    const newRecipe = req.body;
  
    Recipe.create(newRecipe)
      .then((recipeFromDB) => {
        res.status(201).json(recipeFromDB);
      })
      .catch((error) => {
        console.log("\n\n Error creating a new recipe in the DB...\n", error);
        res.status(500).json({ error: 'Failed to create a new recipe' });
      });
  });


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res, next) => {

    const { max_duration } = req.query;
  
    let filter = {};
  
    if (max_duration !== undefined) {
      filter = { duration: { $lte: max_price } }
    }
  
    Recipe.find(filter)
      .then((recipes) => {
        res.status(200).json(recipes);
      })
      .catch((error) => {
        console.log("\n\n Error fetching recipes in the DB...\n", error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
      })
  
  })


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:recipeId', (req, res, next) => {

    let { recipeId } = req.params;
  
    Recipe.findById(recipeId)
      .then((recipe) => {
        res.status(200).json(recipe);
      })
      .catch((error) => {
        console.log("\n\n Error fetching recipe in the DB...\n", error);
        res.status(500).json({ error: 'Failed to fetch recipe' });
      })
  })


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:recipeId', (req, res, next) => {

    let { recipeId } = req.params;
  
    const newrecipe = req.body;
  
    Recipe.findByIdAndUpdate(recipeId, newrecipe, { new: true })
      .then((recipe) => {
        res.status(200).json(recipe);
      })
      .catch((error) => {
        console.log("\n\n Error updating recipe in the DB...\n", error);
        res.status(500).json({ error: 'Failed to fetch recipe' });
      })
  })
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:recipeId', (req, res, next) => {

    let { recipeId } = req.params;
  
    Recipe.findByIdAndDelete(recipeId)
      .then((recipe) => {
        res.status(200).json(recipe);
      })
      .catch((error) => {
        console.log("\n\n Error deleting recipe in the DB...\n", error);
        res.status(500).json({ error: 'Failed to fetch recipe' });
      })
  })


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
