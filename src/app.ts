import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import createGraphqlServer from './graphql';

const PORT = process.env.PORT;

const init = async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    const gqlServer = await createGraphqlServer();
    app.use('/graphql', expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log("Server started...");
    });
};

init();
