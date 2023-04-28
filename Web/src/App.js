import './App.css';
import React, {useEffect} from "react";
import {Header} from "./components/header/Header";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from 'react-router-dom'
import {Box, CssBaseline, Stack} from "@mui/material";
import {LoginPage} from "./components/pages/LoginPage";
import {initialize, initializedSelector} from "./store/app";
import {RegisterPage} from "./components/pages/RegisterPage";
import {ConfirmPage} from "./components/pages/ConfirmPage";
import {Preloader} from "./components/common/Preloader";
import {CustomersPage} from "./components/pages/Admin/CustomersPage";
import {CateringsPage} from "./components/pages/service/CateringsPage";
import {MenuPage} from "./components/pages/service/menu/MenuPage"
import {BoxesPage} from "./components/pages/service/boxes/BoxesPage";

const TempMain = () => <div>Dima is chort</div>;
const Temp404 = () => <div>404 NOT FOUND</div>
export const App = () => {
    const initialized = useSelector(initializedSelector)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initialize())
    },[])
    return !initialized ? <Preloader/> : <Stack spacing={5}>
        <CssBaseline/>
        <Header/>
        <Box component="main">
            <Routes>
                <Route path='/' element={<TempMain/>} exact/>
                <Route path='/confirm' element={<ConfirmPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/test' element={<CustomersPage/>}/>
                <Route path='/service/caterings/:cateringId/boxes' element={<BoxesPage/>}/>
                <Route path='/service/caterings/:cateringId/menu' element={<MenuPage/>}/>
                <Route path='/service/caterings' element={<CateringsPage/>}/>
                <Route path='*' element={<Temp404/>}/>
            </Routes>
        </Box>
    </Stack>;
}
