import { createCustomer, createOrder, createShipping } from "./resolvers/mutation";
import mutation from "./typeDefs/mutation";
import types from "./typeDefs/types";

const Customer = {
    typeDefs: {
        types,
        mutation,
    },
    resolvers: {
        mutation: {
            createCustomer,
            createOrder,
            createShipping
        }
    }
};

export default Customer;