const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const env=require('dotenv')
const graphQlSchema = require('./schema/index');
const graphQlResolvers = require('./resolvers/index');
const isAuth = require('./middleware/is-auth');

env.config()
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);
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
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });