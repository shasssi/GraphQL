import { handleSignin } from "../../../controllers/login"

export const signIn = async (_p: any, payload: { email: string, password: string }) => {
    const user = await handleSignin(payload);
    return user;
};