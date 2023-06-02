import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../utils/pagedArray";
import {commonGet, getSelector, handleResponse, setErrors, setUpdated} from "./common";
import {del, patch, post} from "../api";

const {actions, name, reducer} = createSlice({
    name: 'employee',
    initialState: {
        employees: new PagedArray()
    },
    reducers: {
        employeesSuccess: (state, {payload}) => {
            state.employees = new PagedArray(payload)
        },
    },
});
export default reducer
export const selector = getSelector(name)
export const {employeesSuccess} = actions
export const getEmployees = (filter = null) => commonGet('Account/GetEmployees', filter, employeesSuccess)
export const register = data => async dispatch => {
    const response = await post(`Account/Register/Employee`, data, {callbackUrl: "/register/confirm"});
    await handleResponse(response, dispatch, setUpdated, setErrors);
}
export const rename = ({name, id}) => async dispatch => {
    const response = await patch(`Account/ChangeName/${id}`, {name});
    await handleResponse(response, dispatch, setUpdated, setErrors);
}
export const deleteEmployee = id => async dispatch => {
    const response = await del(`Account/Delete/${id}`)
    await handleResponse(response, dispatch, setUpdated, setErrors);
}