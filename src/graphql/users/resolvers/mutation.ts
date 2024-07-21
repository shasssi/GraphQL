import {
    createUser,
    deleteUserById,
    getAllUsers,
    getUserById,
    throwGraphqlError
} from '../../../controllers/user';

const isUserAuthenticated = (context: any) => {
    if (!(context && context?.id)) throwGraphqlError('Access denied', 'FORBIDDEN');
};

export const createNewUser = async (_parent: any, payload: { name: string, email: string, password: string }, context: any) => {
    isUserAuthenticated(context);
    const user = await createUser(payload);
    return user;
};

export const fetchAllUsers = async (_p: any, payload: any, context: any) => {
    isUserAuthenticated(context);
    const users = await getAllUsers();
    return users;
};

export const fetchUserById = async (_parent: any, payload: { id: string }, context: any) => {
    isUserAuthenticated(context);
    const user = await getUserById(payload);
    return user;
};

export const deleteUser = async (_p: any, payload: { id: string }, context: any) => {
    isUserAuthenticated(context);
    const user = await deleteUserById(payload)
};