import {instance} from "./api";

let controller = 'Catering';
export const cateringAPI = {
    get(serviceId) {
        let params = {serviceId}
        return instance.get(`${controller}`, {params})
    },
    add(name, street, city, state, serviceId) {
        const data = {name, street, city, state, serviceId};
        return instance.post(`${controller}`, data)
    },
    edit(id, name, street, city, state, serviceId) {
        const data = {id, name, street, city, state, serviceId};
        return instance.put(`${controller}`, data)
    },
    delete(id) {
        let params = {id}
        return instance.delete(`${controller}`, {params})
    },
}