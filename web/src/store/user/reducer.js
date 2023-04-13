import {createSlice} from "@reduxjs/toolkit";
export const slice = createSlice({
  name: 'user',
  initialState: {
    confirmed: null,
    errors: null,
    info: null,
    registered: false,
    role: null
  },
  reducers: {
    confirmEmailSuccess: (state, action) => {
      state.confirmed = action.payload;
    },
    fail: (state, action) => {
      state.errors = action.payload.errors;
    },
    loginSuccess: (state, action) => {
      state.info = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.info = null;
      state.role = null;
    },
    registerSuccess: (state, action) => {
      state.registered = true;
    },
    roleSuccess: (state, action) => {
      state.role = action.payload;
    }
  },
});
export default slice.reducer
