import {del, get, patch, post, put} from "../api";
import {createSlice} from "@reduxjs/toolkit";

export const getSelector = name => field => state => state[name][field];

const {actions, name, reducer} = createSlice({
    name: 'common',
    initialState: {
        errors: null,
        updated: false,
    },
    reducers: {
        resetErrors: (state) => {
            state.errors = null
        },

        setErrors: (state, {payload}) => {
            state.errors = payload.errors
        },

        setUpdated: (state, {payload}) => {
            state.updated = payload
        }
    },
});
export default reducer
export const selector = getSelector(name)
export const {setErrors, resetErrors, setUpdated} = actions
export const handleResponse = async (response, dispatch, setUpdated, setErrors) => {
    if (response.ok)
        dispatch(setUpdated(true))
    else {
        const data = await response.json();
        dispatch(setErrors(data))
    }
};
export const commonGet = (url, filter, action) => async dispatch => {
    const response = await get(url, filter)
    if (response.ok) {
        const data = await response.json()
        dispatch(action(data))
    }
}
export const commonPut = (url, data) => async dispatch => {
    const response = await put(url, data, {id: data.id})
    await handleResponse(response, dispatch, setUpdated, setErrors);
}
export const commonPatch = (url, data) => async dispatch => {
    const response = await patch(url, data, {id: data.id})
    await handleResponse(response, dispatch, setUpdated, setErrors);
}
export const commonDelete = (url, id) => async dispatch => {
    const response = await del(url, {id})
    await handleResponse(response, dispatch, setUpdated, setErrors);
}
export const commonPost = (url, data) => async dispatch => {
    const response = await post(url, data)
    await handleResponse(response, dispatch, setUpdated, setErrors);
}