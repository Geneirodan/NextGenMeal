import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit';
import user from './user/reducer'
import app from './app'
import service from './service/reducer'
let reducer = combineReducers({
    app,
    user,
    service,
})
export default configureStore({
    reducer,
    middleware: [thunkMiddleware]
});
