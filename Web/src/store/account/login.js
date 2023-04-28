import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/auth-api";

const slice = createSlice({
    name: 'login',
    initialState: {
        confirmed: null,
        errors: null,
        info: null,
        role: null
    },
    reducers: {
        confirmEmailSuccess: (state, action) => {
            state.confirmed = action.payload;
        },
        fail: (state, action) => {
            state.errors = action.payload.errors;
        },
        infoSuccess: (state, action) => {
            state.info = action.payload;
        },
        logoutSuccess: (state, action) => {
            state.role = null;
        },
        roleSuccess: (state, action) => {
            state.role = action.payload;
        }
    },
});
export default slice.reducer
const {infoSuccess, roleSuccess, fail, logoutSuccess, confirmEmailSuccess} = slice.actions
export const resetErrors = () => async dispatch => {
    dispatch(fail(null))
}
export const selectors = {
    confirmed: state => state.login.confirmed,
    errors: state => state.login.errors,
    info: state => state.login.info,
    role: state => state.login.role,
}

export const getInfo = () => async dispatch => {
    const response = await authAPI.info()
    if (response.ok) {
        const data = await response.json();
        dispatch(infoSuccess(data))
    }
}

export const getRole = () => async dispatch => {
    const response = await authAPI.role()
    if (response.ok) {
        const data = await response.text();
        dispatch(roleSuccess(data))
    }
}

export const signIn = ({email, password}) => async dispatch => {
    dispatch(fail(null))
    const response = await authAPI.login(email, password)
    if (response.ok)
        dispatch(getRole())
    else {
        const data = await response.json();
        dispatch(fail(data))
    }
}

export const signOut = () => async dispatch => {
    const response = await authAPI.logout()
    if (response.ok)
        dispatch(logoutSuccess())
}

export const confirmEmail = ({id, code}) => async dispatch => {
    const response = await authAPI.confirmEmail(id, code)
    dispatch(confirmEmailSuccess(response.ok))
}
