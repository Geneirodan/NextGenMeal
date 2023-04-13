import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import user from './user/reducer'
import app from './app'

let reducer = combineReducers({
    app,
    user,
})
export default configureStore({
    reducer,
    middleware: [thunkMiddleware]
});
