import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../../utils/pagedArray";
import {commonGet, commonInitialState, commonPost, commonReducers, getSelector} from "../common";
import {get} from "../../api/api";

const {actions, name, reducer} = createSlice({
    name: 'customer.order',
    initialState: {
        ...commonInitialState,
        caterings: new PagedArray(),
        services: new PagedArray(),
        optimalDishes: []
    },
    reducers: {
        ...commonReducers,
        cateringsSuccess: (state, action) => {
            state.caterings = new PagedArray(action.payload)
        },
        servicesSuccess: (state, action) => {
            state.services = new PagedArray(action.payload)
        },
        optimalDishesSuccess: (state, action) => {
            state.optimalDishes = action.payload
        }
    },
});
export default {name, reducer}
export const selector = getSelector(name)
export const {resetErrors, setUpdated, cateringsSuccess, servicesSuccess, setErrors, optimalDishesSuccess} = actions
export const getCaterings = (filter = null) => commonGet(`Catering/${filter.serviceId}`, filter, cateringsSuccess)
export const getServices = (filter = null) => commonGet('Order/Services', filter, servicesSuccess)
export const getOptimalDishes = (filter = null) => async dispatch => {
    const response = await get('Order/Optimal', filter)
    const data = await response.json()
    const action = response.ok ? optimalDishesSuccess : setErrors
    dispatch(action(data))
    return response.ok
}
export const addOrder = order => commonPost('Order', order, setUpdated, setErrors)