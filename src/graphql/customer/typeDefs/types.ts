export default `
    type Customer {
        id: ID!
        firstName: String
        lastName: String
        age: Int
        country: String
    }
    type Order {
        id: ID!
        item: String
        amount: Int
        customerId: Int
    }
    type Shipping {
        id: ID!
        status: String
        customerId: Int
    }
`;