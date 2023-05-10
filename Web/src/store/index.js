import {combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {configureStore} from '@reduxjs/toolkit';
import login from './account/login'
import app from './app'
import caterings from './service/caterings'
import menu from './service/menu'
import boxes from "./service/boxes";
import order from "./customer/new_order";
import orders from "./customer/orders";
import employee from "./service/employee"

export default configureStore({
    reducer: combineReducers({
        app,
        [login.name]: login.reducer,
        [caterings.name]: caterings.reducer,
        [menu.name]: menu.reducer,
        [boxes.name]: boxes.reducer,
        [order.name]: order.reducer,
        [orders.name]: orders.reducer,
        [employee.name]: employee.reducer
    }),
    middleware: [thunkMiddleware]
});
