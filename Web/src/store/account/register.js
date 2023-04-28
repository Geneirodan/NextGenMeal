import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/auth-api";

const slice = createSlice({
    name: 'register',
    initialState: {
        errors: null,
        registered: false
    },
    reducers: {
        fail: (state, action) => {
            state.errors = action.payload.errors;
        },
        registerSuccess: (state, action) => {
            state.registered = true;
        }
    },
});
export default slice.reducer
export const selectors = {
    registered: state => state.register.registered,
    errors: state => state.register.errors
}
const {registerSuccess, fail} = slice.actions
export const resetErrors = () => async dispatch => {
    dispatch(fail(null))
}
export const register = ({name, email, password, confirmPassword}) => async dispatch => {
    dispatch(fail(null))
    const response = await authAPI.register(name, email, password, confirmPassword)
    if(response.ok){
        dispatch(registerSuccess())
    }else {
        const data = await response.text();
        dispatch(fail(data))
    }
}