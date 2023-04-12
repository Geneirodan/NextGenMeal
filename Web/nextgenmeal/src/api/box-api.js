import {instance} from "./api";

let controller = 'Box';
export const boxAPI = {
    get() {
        return instance.get(`${controller}`)
    },
    add(price, description, terminalId) {
        const data = {price, description, terminalId};
        return instance.post(`${controller}`, data)
    },
    edit(id, price, description, terminalId) {
        const data = {id, price, description, terminalId};
        return instance.put(`${controller}`, data)
    },
    delete(id) {
        let params = {id}
        return instance.delete(`${controller}`, {params})
    },
}