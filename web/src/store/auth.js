import {createSlice} from "@reduxjs/toolkit";
import {commonGet, getSelector, handleResponse, setErrors, setUpdated} from "./common";
import {del, get, patch, post} from "../api";

const {actions, name, reducer} = createSlice({
    name: 'auth',
    initialState: {
        confirmed: null,
        info: null,
        role: null,
        countries: []
    },
    reducers: {
        confirmEmailSuccess: (state, {payload}) => {
            state.confirmed = payload;
        },
        infoSuccess: (state, {payload}) => {
            state.info = payload;
        },
        logoutSuccess: (state) => {
            state.role = null;
            state.info = null;
        },
        roleSuccess: (state, {payload}) => {
            state.role = payload;
        },
        setCountries: (state, {payload}) => {
            state.countries = payload;
        },
    },
});
export default reducer
export const selector = getSelector(name)
export const {infoSuccess, roleSuccess, logoutSuccess, confirmEmailSuccess, setCountries} = actions

export const getInfo = () => async dispatch => {
    const response = await get(`Account/Info`)
    if (response.ok) {
        const data = await response.json();
        dispatch(infoSuccess(data))
    }
}

export const getRole = () => async dispatch => {
    const response = await get(`Account/Role`)
    if (response.ok) {
        const data = await response.text();
        dispatch(roleSuccess(data))
    }
}

export const signIn = ({email, password}) => async dispatch => {
    const response = await post(`Account/Login`, {email, password})
    await handleResponse(response, dispatch);
}

export const signOut = () => async dispatch => {
    const response = await del(`Account/Logout`)
    if (response.ok) {
        dispatch(logoutSuccess())
        dispatch(setUpdated(false))
    }
}

export const confirmEmail = ({id, code}) => async dispatch => {
    const response = await get(`Account/ConfirmEmail`, {id, code})
    dispatch(confirmEmailSuccess(response.ok))
}
export const register = ({name, email, password, confirmPassword}) =>
    async dispatch => {
        const data = {name, email, password, confirmPassword};
        const response = await post(`Account/Register`, data, {callbackUrl: `${window.location.origin}/confirm`})
        await handleResponse(response, dispatch)
    }

export const rename = ({name}) => async dispatch => {
    const response = await patch(`Account/ChangeName`, {name})
    await handleResponse(response, dispatch)
}
export const getCountries = () => commonGet('languages', null, setCountries);