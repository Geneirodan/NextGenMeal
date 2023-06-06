import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../utils/pagedArray";
import {commonGet, getSelector} from "./common";

const {actions, name, reducer} = createSlice({
    name: 'orders',
    initialState: {
        orders: new PagedArray()
    },
    reducers: {
        ordersSuccess: (state, {payload}) => {
            state.orders = new PagedArray(payload)
        },
    },
});
export default reducer
export const selector = getSelector(name)
export const getOrders = (filter = null) => commonGet(`Order`, filter, actions.ordersSuccess)