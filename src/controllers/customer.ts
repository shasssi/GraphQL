import prisma from "../prismaClient";
import { throwGraphqlError } from "./user";

export const createNewCustomer = async (payload: any) => {
    const { firstName, lastName, age, country } = payload;
    try {
        const newCustomer = await prisma.customer.create({
            data: {
                firstName,
                lastName,
                age,
                country
            }
        });
        return newCustomer;
    } catch (error) {
        throwGraphqlError('Customer not created', 'BAD_USER_INPUT');
    }
};

export const createNewOrder = async (payload: any) => {
    const { item, amount, customerId } = payload;
    try {
        const newOrder = await prisma.order.create({
            data: {
                item,
                amount,
                customerId
            }
        });
        return newOrder;
    } catch (error) {
        throwGraphqlError('Order not created', 'BAD_USER_INPUT');
    }
};

export const createNewShipping = async (payload: any) => {
    const { status, customerId } = payload;
    try {
        const newShipping = await prisma.shipping.create({
            data: {
                status,
                customerId
            }
        });
        return newShipping;
    } catch (error) {
        throwGraphqlError("Shipping not created", "BAD_USER_INPUT");
    }
};