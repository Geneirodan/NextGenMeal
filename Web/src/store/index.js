import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';
import auth from './auth'
import app from './app'
import admin from './admin'
import common from './common'
import caterings from './caterings'
import menu from './menu'
import order from "./order";
import orders from "./orders";
import employee from "./employee"

export default configureStore({
    reducer: combineReducers({admin, app, auth, caterings, employee, menu, order, orders, common}),
    middleware: [thunkMiddleware]
});
