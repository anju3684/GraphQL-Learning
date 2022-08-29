const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
app.use(bodyParser.json());
const events = [];
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
     type Event{
        _id:ID!
        title:String!
        description:String!
        price:Float!
        date:String!
     }
     input EventInput{
        title:String!
        description:String!
        price:Float!
        date:String!

     }

     type RootQuery{
        events:[Event!]!
     }
     type RootMutation{
        createEvent(eventInput:EventInput):Event

     }
    schema{
            query:RootQuery 
            mutation:RootMutation
    }
     `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        
        const eventInput = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date,
        };
        events.push(eventInput);
        return eventInput
      },
    },
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3000);
