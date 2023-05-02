import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';
import login from './account/login'
import register from './account/register'
import app from './app'
import caterings from './service/caterings'
import menu from './service/menu'
import boxes from "./service/boxes";

export default configureStore({
    reducer: combineReducers({
        app,
        login,
        register,
        [caterings.name]: caterings.reducer,
        [menu.name]: menu.reducer,
        [boxes.name]: boxes.reducer
    }),
    middleware: [thunkMiddleware]
});
