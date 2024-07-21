import { createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient";
import { throwGraphqlError } from "./user";

const secret = process?.env?.SECRET_KEY;

const validatePassword = (salt: string, password: string, hashedPassword: string) => {
    const newHash = createHmac('sha256', salt).update(password).digest('hex');
    return newHash === hashedPassword;
};

const generateToken = (payload: any) => {
    const token = secret && jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
};

export const validateToken = (token: string) => {
    if (secret) return jwt.verify(token, secret);
    return {};
};

export const handleSignin = async ({ email, password }: { email: string, password: string }) => {
    if (!email || !password) throwGraphqlError('Incorrect username or password', 'BAD_USER_INPUT');
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        throwGraphqlError('Incorrect username or password', 'BAD_USER_INPUT');
        return;
    }
    const isValid = validatePassword(user.salt, password, user.password);
    if (!isValid) throwGraphqlError('Incorrect username or password', 'BAD_USER_INPUT');

    return {
        ...user,
        token: generateToken({ id: user.id, email: user.email })
    };
};