import {createSlice} from '@reduxjs/toolkit'
import {authAPI} from '../api/auth-api'
// Slice
const slice = createSlice({
    name: 'user',
    initialState: {
        role: null,
        info: null,
        isRegistered: false,
        errors: null
    },
    reducers: {
        fail: (state, action) => {
            state.errors = action.payload.errors;
        },
        registerSuccess: (state, action) => {
            state.isRegistered = true;
        },
        loginSuccess: (state, action) => {
            state.info = action.payload;
        },
        roleSuccess: (state, action) => {
            state.role = action.payload;
        },
        logoutSuccess: (state, action) => {
            state.info = null;
            state.role = null;
        },
    },
});
export default slice.reducer

// Selectors

export const userSelectors = {
    role: state => state.user.role,
    info: state => state.user.info,
}

// Actions
const {registerSuccess, loginSuccess, roleSuccess, logoutSuccess, fail} = slice.actions

export const getInfo = () => async dispatch => {
    const response = await authAPI.info()
    if (response.ok){
        const data = await response.json();
        dispatch(loginSuccess(data))
    }
}

export const getRole = () => async dispatch => {
    const response = await authAPI.role()
    if (response.ok){
        const data = await response.text();
        dispatch(roleSuccess(data))
    }
}
export const login = ({email, password}) => async dispatch => {
    const response = await authAPI.login(email, password)
    const action = response.ok ? loginSuccess : fail
    const data = await response.json();
    dispatch(action(data))

}
export const register = ({name, email, password, confirmPassword}) => async dispatch => {
    const response = await authAPI.register(name, email, password, confirmPassword)
    const action = response.ok ? registerSuccess : fail
    const data = await response.json();
    dispatch(action(data))

}
export const logout = () => async dispatch => {
    const res = await authAPI.logout()
    if (res.ok)
        dispatch(logoutSuccess())
}