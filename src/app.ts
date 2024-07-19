import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const init = async () => {
    const app = express();
    // create graphql server
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
        type User {
            id: ID!
            name: String
            email: String!
        }
        type Mutation {
            createUser(name: String, email: String!): String,
            getUsers: [User]
        }
        `,
        resolvers: {
            Query: {
                sayHello: () => 'Hello from GraphQL',
                getTodos: () => [{ id: 1, name: 'qwert', title: 'qwerty' }]
            },
            Mutation: {
                createUser: async (_parent, { name, email }: { name: string, email: string }) => {
                    await prisma.user.create({
                        data: {
                            name,
                            email
                        }
                    })
                    return 'User created';
                },
                getUsers: async () => {
                    const users = await prisma.user.findMany();
                    return users || [];
                }
            }
        },
    });

    // start graphql server
    await server.start();

    app.use(cors());
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server));

    app.listen(8000, () => {
        console.log("Server started...");
    })

}

init();
