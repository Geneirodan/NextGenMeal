import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../utils/pagedArray";
import {commonGet, commonPatch, getSelector, handleResponse, setErrors, setUpdated} from "./common";
import {post} from "../api";

const {actions, name, reducer} = createSlice({
    name: 'admin',
    initialState: {
        users: new PagedArray()
    },
    reducers: {
        usersSuccess: (state, {payload}) => {
            state.users = new PagedArray(payload)
        }
    }
});
export default reducer
export const selector = getSelector(name)
export const {usersSuccess} = actions
export const getCustomers = (filter = null) => commonGet('Account/GetCustomers', filter, usersSuccess)
export const getServices = (filter = null) => commonGet('Account/GetServices', filter, usersSuccess)
export const block = id => commonPatch('Account/Block', {id})
export const unblock = id => commonPatch('Account/Unblock', {id})
export const registerService = data => async dispatch => {
    const response = await post(`Account/Register/Service`, data, {callbackUrl: "/register/confirm"});
    await handleResponse(response, dispatch);
}