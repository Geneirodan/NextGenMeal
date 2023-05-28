import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../utils/pagedArray";
import {commonGet, commonInitialState, commonPatch, commonReducers, getSelector} from "./common";

const {actions, name, reducer} = createSlice({
    name: 'admin',
    initialState: {
        ...commonInitialState,
        users: new PagedArray()
    },
    reducers: {
        ...commonReducers,
        usersSuccess: (state, {payload}) => {
            state.users = new PagedArray(payload)
        }
    }
});
export default reducer
export const selector = getSelector(name)
export const {usersSuccess, resetErrors, setErrors, setUpdated} = actions
export const getCustomers = (filter = null) => commonGet('Account/GetCustomers', filter, usersSuccess)
export const getServices = (filter = null) => commonGet('Account/GetServices', filter, usersSuccess)
export const block = id => commonPatch('Account/Block', {id}, setUpdated, setErrors)
export const unblock = id => commonPatch('Account/Unblock', {id}, setUpdated, setErrors)