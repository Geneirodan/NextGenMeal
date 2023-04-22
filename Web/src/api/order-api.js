import {instance} from "./api";

export const dishAPI = {
    get() {
        return instance.get(`Dish`)
    },
    add(cateringId, time, isBox, orderDishes) {
        return instance.post(`Dish`, {cateringId, time, isBox, orderDishes})
    },
    delete(id) {
        let params = {id}
        return instance.delete(`Dish`, {params})
    },
}