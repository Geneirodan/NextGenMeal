import {del, get, post, put} from "./api";

let controller = 'Box';
export const boxAPI = {

    get: async () =>
        await get(`${controller}`),

    add: async (price, description, terminalId) =>
        await post(`${controller}`, {price, description, terminalId}),

    edit: async (id, price, description, terminalId) =>
        await put(`${controller}`, {id, price, description, terminalId}),

    delete: async id =>
        await del(`${controller}`, {id}),
}