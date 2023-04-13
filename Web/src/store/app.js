import { createSlice } from '@reduxjs/toolkit'

import {getRole} from "./user/thunks";

// Slice
const slice = createSlice({
    name: 'app',
    initialState: { initialized: false },
    reducers: {
        initializeSuccess: (state, action) => {
            state.initialized = true;
        },
    },
});
export default slice.reducer

// Actions
const { initializeSuccess } = slice.actions

export const initialize = () => async dispatch => {
    try {
        await dispatch(getRole())
    } catch (e) {
        console.error(e.message);
    }
    dispatch(initializeSuccess());
}

// Selectors
export const initializedSelector = (state) => state.app.initialized
