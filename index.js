const express = require('express');
var graphqlHTTP = require('express-graphql');
var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello: () => {
    return 'Hello';
  }
};

var app = express();
app.use(`/graphql`, graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql:true
}));

app.listen(5000);
console.log(`Running on port 5000`);
