import './App.css';
import React, {useEffect} from "react";
import {Header} from "./components/header/Header";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from 'react-router-dom'
import {Box, CssBaseline, Stack} from "@mui/material";
import {LoginPage} from "./components/pages/LoginPage";
import {initialize, initializedSelector, setInitialized} from "./store/app";
import {RegisterPage} from "./components/pages/RegisterPage";
import {ConfirmPage} from "./components/pages/ConfirmPage";
import {Preloader} from "./components/common/Preloader";
import {CustomersPage} from "./components/pages/Admin/CustomersPage";
import {CateringsPage} from "./components/pages/service/CateringsPage";
import {MenuPage} from "./components/pages/service/MenuPage"
import {BoxesPage} from "./components/pages/service/BoxesPage";
import {OrderPage} from "./components/pages/customer/orderPage/OrderPage";
import {OrdersPage} from "./components/pages/customer/OrdersPage";
import {EmployeesPage} from "./components/pages/service/EmployeesPage";
import {useUpdate} from "./utils/hook/hooks";
import {selector} from "./store/account/login";
import {Footer} from "./components/Footer";

const TempMain = () => <div>Dima is chort</div>;
const Temp404 = () => <div>404 NOT FOUND</div>
export const App = () => {
    const initialized = useSelector(initializedSelector)
    const updated = useUpdate(selector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setInitialized(false));
        dispatch(initialize())
    }, [updated])
    return !initialized ? <Preloader/> : <Stack spacing={5} sx={{height: "100%"}}>
        <CssBaseline/>
        <Header/>
        <Box component="main" sx={{height: "100%"}}>
            <Routes>
                <Route path='/' element={<TempMain/>} exact/>
                <Route path='/confirm' element={<ConfirmPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/test' element={<CustomersPage/>}/>
                <Route path='/order' element={<OrderPage/>}/>
                <Route path='/myorders' element={<OrdersPage/>}/>
                <Route path='/service/caterings/:terminalId/boxes' element={<BoxesPage/>}/>
                <Route path='/service/caterings/:cateringId/menu' element={<MenuPage/>}/>
                <Route path='/service/caterings/:cateringId/personnel' element={<EmployeesPage/>}/>
                <Route path='/service/caterings' element={<CateringsPage/>}/>
                <Route path='*' element={<Temp404/>}/>
            </Routes>
        </Box>
    </Stack>;
}
