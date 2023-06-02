import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../utils/pagedArray";
import {commonGet, commonPost, getSelector, setErrors, setUpdated} from "./common";
import {get} from "../api";

const {actions, name, reducer} = createSlice({
    name: 'order',
    initialState: {
        caterings: new PagedArray(),
        services: new PagedArray(),
        selectedDishes: {}
    },
    reducers: {
        cateringsSuccess: (state, {payload}) => {
            state.caterings = new PagedArray(payload)
        },
        servicesSuccess: (state, {payload}) => {
            state.services = new PagedArray(payload)
        },
        selectedDishesSuccess: (state, {payload}) => {
            state.selectedDishes = payload
        },
        addDish: (state, {payload}) => {
            state.selectedDishes[payload.dishId.toString()] = payload
        },
        removeDish: (state, {payload}) => {
            state.selectedDishes = Object.values(state.selectedDishes).filter(item => item.dishId !== payload.dishId)
        }
    },
});
export default reducer
export const selector = getSelector(name)
export const {cateringsSuccess, servicesSuccess, selectedDishesSuccess, addDish, removeDish} = actions
export const getCaterings = (filter = null) => commonGet(`Catering/${filter.serviceId}`, filter, cateringsSuccess)
export const getServices = (filter = null) => commonGet('Order/Services', filter, servicesSuccess)
export const getOptimalDishes = (filter = null) => async dispatch => {
    const response = await get('Order/Optimal', filter)
    const data = await response.json()
    const action = response.ok ? selectedDishesSuccess : setErrors
    dispatch(action(data))
    return response.ok
}
export const addOrder = order => commonPost('Order', order, setUpdated, setErrors)