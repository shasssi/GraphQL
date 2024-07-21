import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import createGraphqlServer from './graphql';
import { validateToken } from './controllers/login';

const PORT = process.env.PORT;

const init = async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    const gqlServer = await createGraphqlServer();
    app.use('/graphql', expressMiddleware(gqlServer, {
        context: async ({ req }) => {
            try {
                const token: any = req.header('Authorization');
                if (!token) return {};
                const payload = validateToken(token);
                return payload;
            } catch (error) {
                return {};
            }
        }
    }));

    app.listen(PORT, () => {
        console.log("Server started...");
    });
};

init();
