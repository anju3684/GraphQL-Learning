const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const env=require('dotenv')
const graphQlSchema = require('./schema/index');
const graphQlResolvers = require('./resolvers/index');


env.config()
const app = express();

app.use(bodyParser.json());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
  

mongoose
  .connect(
   `mongodb+srv://anju3684:anju3684@cluster0.gekj8a3.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });