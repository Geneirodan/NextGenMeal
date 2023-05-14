import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../../utils/pagedArray";
import {commonGet, commonInitialState, commonPatch, commonReducers, getSelector} from "../common";

const {actions, name, reducer} = createSlice({
    name: 'customer.orders',
    initialState: {
        ...commonInitialState,
        orders: new PagedArray()
    },
    reducers: {
        ...commonReducers,
        ordersSuccess: (state, {payload}) => {
            state.orders = new PagedArray(payload)
        },
    },
});
export default {name, reducer}
export const selector = getSelector(name)
export const {resetErrors, setUpdated, setErrors, ordersSuccess} = actions
export const getOrders = (filter = null) => commonGet(`Order`, filter, ordersSuccess)
export const pay = order => commonPatch(`Order/Pay`, order, setUpdated, setErrors)