import './App.css';
import React, {useEffect} from "react";
import {Header} from "./components/header/Header";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from 'react-router-dom'
import {Box, CssBaseline, Stack} from "@mui/material";
import {LoginPage} from "./components/pages/LoginPage";
import {initialize, selector, setInitialized} from "./store/app";
import {RegisterPage} from "./components/pages/RegisterPage";
import {ConfirmPage} from "./components/pages/ConfirmPage";
import {Preloader} from "./components/common/Preloader";
import {CustomersPage} from "./components/pages/admin/CustomersPage";
import {CateringsPage} from "./components/pages/service/CateringsPage";
import {MenuPage} from "./components/pages/service/MenuPage"
import {NewOrderPage} from "./components/pages/customer/orderPage/NewOrderPage";
import {MyOrdersPage} from "./components/pages/customer/MyOrdersPage";
import {EmployeesPage} from "./components/pages/service/EmployeesPage";
import {useUpdate} from "./utils/hook/hooks";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {OrderPage} from "./components/pages/employee/OrderPage";
import {OrdersPage} from "./components/pages/employee/OrdersPage";
import {Footer} from "./components/Footer";
import {getCustomers, getServices} from "./store/admin";
import mainImage from "./img/NextGenMealMain.png"
import {ServiceRegisterPage} from "./components/pages/admin/ServiceRegisterPage";

const theme = createTheme({
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 3
            },
        },
    },
});
const TempMain = () => <Stack justifyContent="center" alignItems="center" sx={{height: "100%", width: "100%"}}>
    <img src={mainImage} alt="NextGenMeal"/>
    <h1>Your ad could be here!</h1>
</Stack>;
const Temp404 = () => <div>404 NOT FOUND</div>
export const App = () => {
    const initialized = useSelector(selector("initialized"))
    const updated = useUpdate()
    const dispatch = useDispatch()
    useEffect(
        () => {
            dispatch(setInitialized(false));
            dispatch(initialize())
        },
        [updated]
    )
    return !initialized
        ? <Preloader/>
        : <ThemeProvider theme={theme}>
            <Stack spacing={5} sx={{minHeight: "100vh"}}>
                <CssBaseline/>
                <Header/>
                <Box component="main" sx={{height: "100%"}} flexGrow={1}>
                    <Routes>
                        <Route path='/' element={<TempMain/>} exact/>
                        <Route path='/confirm' element={<ConfirmPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='/register' element={<RegisterPage/>}/>
                        <Route path="/register/confirm" element={<div>Successfully registered. The confirmation link has been sent on your email.</div>}/>
                        <Route path='/my_orders/new' element={<NewOrderPage/>}/>
                        <Route path='/my_orders' element={<MyOrdersPage/>}/>
                        <Route path='/orders/new' element={<OrderPage/>}/>
                        <Route path='/orders' element={<OrdersPage/>}/>
                        <Route path='/service/caterings/:cateringId/menu' element={<MenuPage/>}/>
                        <Route path='/service/caterings/:cateringId/personnel' element={<EmployeesPage/>}/>
                        <Route path='/service/caterings' element={<CateringsPage/>}/>
                        <Route path='/admin/customers' element={<CustomersPage getter={getCustomers}/>}/>
                        <Route path='/admin/services' element={<CustomersPage getter={getServices}/>}/>
                        <Route path='/admin/services/register' element={<ServiceRegisterPage/>}/>
                        <Route path='*' element={<Temp404/>}/>
                    </Routes>
                </Box>
                <Footer/>
            </Stack>
        </ThemeProvider>
}
