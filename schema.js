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
    fields: {
        person: {
        type: PersonType,
        args: {
            id:{type: GraphQLString}
        },
        resolve(parentValue, args){
            for(let i = 0; i < people.length; i++){
                if(people[i].id === args.id){
                    return people[i];
                }
            }
        }
        },
        people: {
            type: new GraphQLList(PersonType),
            resolve(parentValue, args){
                return people
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});

//data
const people = [
    {id: '1', name: "John Doe", email: "johndoe@email.com", age: 35},
    {id: '2', name: "Steve Mark", email: "steve@email.com", age: 20},
    {id: '3', name: "Michelle Smith", email: "michelle@email.com", age: 30},
]