const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');
const schema = require('./schema');

var app = express();
app.use(`/graphql`, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql:true
}));

app.listen(5000, () => {
  console.log(`Running on port 5000`)
});
