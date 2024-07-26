import { ApolloServer } from '@apollo/server';
import Users from './users';
import Login from './login';
import Customer from './customer';

const createGraphqlServer = async () => {
    // create graphql server
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${Users.typeDefs.types}
            ${Login.typeDefs.types}
            ${Customer.typeDefs.types}
            type Todo {
                id: ID!
                name: String
                title: String!
            }
            type Query  {
                sayHello: String,
                getTodos: [Todo]
            }
            type Mutation {
                ${Users.typeDefs.mutation}
                ${Login.typeDefs.mutation}
                ${Customer.typeDefs.mutation}
            }
            `,
        resolvers: {
            Query: {
                sayHello: () => 'Hello from GraphQL',
                getTodos: () => [{ id: 1, name: 'qwert', title: 'qwerty' }]
            },
            Mutation: {
                ...(Users.resolvers.mutation),
                ...(Login.resolvers.mutation),
                ...(Customer.resolvers.mutation),
            }
        },
    });

    // start graphql server
    await gqlServer.start();

    return gqlServer;
};

export default createGraphqlServer;