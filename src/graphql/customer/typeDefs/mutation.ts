export default `
    createCustomer(firstName: String!, lastName: String, age: Int!, country: String!): Customer,
    createOrder(item: String!, amount: Int!, customerId: Int!): Order,
    createShipping(status: String!, customerId: Int!): Shipping,
`;
