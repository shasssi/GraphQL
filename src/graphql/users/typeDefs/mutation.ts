export default `
    createNewUser(name: String, email: String!, password: String): User,
    fetchAllUsers: [User],
    fetchUserById(id: String!): User,
    deleteUser(id: String!): String,
`;