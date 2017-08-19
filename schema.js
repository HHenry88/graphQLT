const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const axios = require('axios');

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
            return axios.get(`http://localhost:3000/people/${args.id}`)
                .then(res => res.data);
        }
        },
        people: {
            type: new GraphQLList(PersonType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/people`)
                    .then(res => res.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addPerson: {
            type: PersonType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parentValue, args){
                return axios.post(`http://localhost:3000/people`, {
                    name: args.name,
                    email: args.email,
                    age: args.age
                })
                .then(res => res.data);
            }
        },
        deletePerson: {
            type: PersonType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args){
                return axios.delete(`http://localhost:3000/people/${args.id}`)
                    .then(res => res.data);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});