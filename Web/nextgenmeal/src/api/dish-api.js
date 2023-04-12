import {instance} from "./api";

let controller = 'Dish';
export const dishAPI = {
    get(cateringId) {
        let params = {serviceId: cateringId}
        return instance.get(`${controller}`, {params})
    },
    add(price, portion, description, tags, cateringId) {
        const data = {price, portion, description, tags, cateringId};
        return instance.post(`${controller}`, data)
    },
    edit(id, price, portion, description, tags, cateringId) {
        const data = {price, portion, description, tags, cateringId};
        return instance.put(`${controller}`, data)
    },
    delete(id) {
        let params = {id}
        return instance.delete(`${controller}`, {params})
    },
}