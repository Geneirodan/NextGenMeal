import {del, get, post, put} from "../api/api";

export const commonInitialState = {
    errors: null,
    updated: false,
}
export const handleResponse = async (response, dispatch, setUpdated, setErrors) => {
    if (response.ok)
        dispatch(setUpdated(true))
    else {
        const data = await response.json();
        dispatch(setErrors(data))
    }
};
export const commonReducers = {
    resetErrors: (state) => {
        state.errors = null
    },

    setErrors: (state, action) => {
        state.errors = action.payload.errors
    },

    setUpdated: (state, action) => {
        state.updated = action.payload
    }
}
export const getSelector = name => field => state => state[name][field];
export const commonGet = (url, filter, action) => async dispatch => {
    const response = await get(url, filter)
    if (response.ok) {
        const data = await response.json()
        dispatch(action(data))
    }
}
export const commonPut = (url, data, setUpdated, setErrors) => async dispatch => {
    const response = await put(url, data, {id: data.id})
    await handleResponse(response, dispatch, setUpdated, setErrors);
}
export const commonDelete = (url, id, setUpdated, setErrors) => async dispatch => {
    const response = await del(url, {id})
    await handleResponse(response, dispatch, setUpdated, setErrors);
}
export const commonPost = (url, data, setUpdated, setErrors) => async dispatch => {
    const response = await post(url, data)
    await handleResponse(response, dispatch, setUpdated, setErrors);
}