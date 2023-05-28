import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';
import auth from './auth'
import app from './app'
import admin from './admin'
import caterings from './service/caterings'
import menu from './service/menu'
import new_order from "./customer/new_order";
import orders from "./customer/orders";
import employee from "./service/employee"

export default configureStore({
    reducer: combineReducers({ app, auth, employee, caterings, menu, new_order, orders, admin}),
    middleware: [thunkMiddleware]
});
