import {
    createUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    throwGraphqlError
} from '../../../controllers/user';

export const createNewUser = async (_parent: any, payload: { name: string, email: string, password: string }) => {
    try {
        const user = await createUser(payload);
        return user;
    } catch (error) {
        throwGraphqlError('User not created', 'BAD_USER_INPUT');
    }
};

export const fetchAllUsers = async () => {
    try {
        const users = await getAllUsers();
        return users;
    } catch (error) {
        throwGraphqlError('Issue while fetching data', 'INTERNAL_SERVER_ERROR');
    }
};

export const fetchUserById = async (_parent: any, payload: { id: string }) => {
    try {
        const user = await getUserById(payload);
        return user;
    } catch (error) {
        throwGraphqlError('User not found', 'BAD_USER_INPUT');
    }
};

export const deleteUser = async (_p: any, payload: { id: string }) => {
    try {
        const user = await deleteUserById(payload)
    } catch (error) {
        throwGraphqlError('User not found', 'BAD_USER_INPUT');
    }
};