const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Person Type
const PersonType = new GraphQLObjectType({
    name: "Person",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});

// root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    person: {
        type: PersonType
    }
});

module.exports = new GraphQLSchema({

});