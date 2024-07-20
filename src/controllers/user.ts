import { createHmac, randomBytes } from "node:crypto";
import prisma from "../prismaClient";
import { GraphQLError } from "graphql";

export const throwGraphqlError = (message: string, code: string) => {
    throw new GraphQLError(message, {
        extensions: {
            code: code
        }
    });
};

const generateHashPassword = (password: string) => {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
    return { salt, hashedPassword };
};

export const createUser = async ({ name, email, password }: { name: string, email: string, password: string }) => {
    const { salt, hashedPassword } = generateHashPassword(password);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            salt
        }
    });
    return newUser;
};

export const getAllUsers = async () => {
    const allUsers = await prisma.user.findMany();
    return allUsers || [];
};

export const getUserById = async ({ id }: { id: string }) => {
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        }
    });
    if (!user) throwGraphqlError('User not found', 'BAD_USER_INPUT');
    return user;
};

export const deleteUserById = async ({ id }: { id: string }) => {
    await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });
    return 'User deleted successfully';
};