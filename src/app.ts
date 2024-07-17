import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { title } from 'process';

const init = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type Todo {
            id: ID!
            name: String
            title: String!
        }
        type Query  {
            sayHello: String,
            getTodos: [Todo]
        }
        `,
        resolvers: {
            Query: {
                sayHello: () => 'Hello from GraphQL',
                getTodos: () => [{ id: 1, name: 'qwert', title: 'qwerty' }]
            }
        },
    });

    await server.start();

    app.use(cors());
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server started...");
    })

}

init();
