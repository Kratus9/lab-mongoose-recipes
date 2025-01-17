const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
// const allRecipes = require("./models/")
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  
  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  //   console.log("Borrado")
  //   return Recipe.create(data[1])
  // })
  
  .then(() => {
    // console.log(data[1].title)
    return Recipe.insertMany(data)
  })

  // .then(() => {
  //   return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { duration: 100}, {new: true})
  // })

  .then(() => {
    return Recipe.deleteOne( {title: "Carrot Cake"} )
  })

  .then(() => {
    console.log("llegamos hasta aquí")
    return mongoose.connection.close()
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });
