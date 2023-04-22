import {slice} from "./reducer";
import {get} from "../../api/api";

const {cateringsSuccess, dishesSuccess, typesSuccess} = slice.actions

export const getCaterings = (params = null) => async dispatch => {
    const response = await get('Catering', params)
    if (response.ok) {
        const data = await response.json()
        dispatch(cateringsSuccess(data))
    }
}
export const getDishes = (params = null) => async dispatch => {
    const response = await get('Dish', params)
    if (response.ok) {
        const data = await response.json()
        dispatch(dishesSuccess(data))
    }
}

export const getTypes = (params = null) => async dispatch => {
    const response = await get('Dish/Types', params)
    if (response.ok) {
        const data = await response.json()
        dispatch(typesSuccess(data))
    }
}