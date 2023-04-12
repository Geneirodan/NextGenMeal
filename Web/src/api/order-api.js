import {instance} from "./api";

let controller = 'Dish';
export const dishAPI = {
    get() {
        return instance.get(`${controller}`)
    },
    add(cateringId, time, isBox, orderDishes) {
        const data = {cateringId, time, isBox, orderDishes};
        return instance.post(`${controller}`, data)
    },
    delete(id) {
        let params = {id}
        return instance.delete(`${controller}`, {params})
    },
}