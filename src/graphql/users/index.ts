import types from "./typeDefs/types";
import query from "./typeDefs/query";
import mutation from "./typeDefs/mutation";
import { createNewUser, fetchAllUsers, fetchUserById, deleteUser } from "./resolvers/mutation";

const Users = {
    typeDefs: {
        types,
        query,
        mutation
    },
    resolvers: {
        query: {},
        mutation: {
            createNewUser,
            fetchAllUsers,
            fetchUserById,
            deleteUser,
        }
    }
};

export default Users;