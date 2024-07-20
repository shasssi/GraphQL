import { signIn } from "./resolvers/mutation";
import mutation from "./typeDefs/mutation";
import types from "./typeDefs/types";

const Login = {
    typeDefs: {
        types,
        mutation
    },
    resolvers: {
        mutation: {
            signIn
        }
    }
};

export default Login;