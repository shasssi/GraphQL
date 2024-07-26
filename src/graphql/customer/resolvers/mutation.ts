import {
    createNewCustomer,
    createNewOrder,
    createNewShipping
} from "../../../controllers/customer";

export const createCustomer = async (_p: any, payload: any) => {
    const customer = await createNewCustomer(payload);
    return customer;
};

export const createOrder = async (_p: any, payload: any) => {
    const order = await createNewOrder(payload);
    return order;
};

export const createShipping = async (_p: any, payload: any) => {
    const shipping = await createNewShipping(payload);
    return shipping;
};