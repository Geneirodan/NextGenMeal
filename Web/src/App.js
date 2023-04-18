import './App.css';
import React, {useEffect} from "react";
import {Header} from "./components/Header/Header";
import { useDispatch, useSelector} from "react-redux";
import {Route, Routes} from 'react-router-dom'
import {Box, CssBaseline, Stack} from "@mui/material";
import {LoginPage} from "./pages/LoginPage";
import {initialize, initializedSelector} from "./store/app";
import {RegisterPage} from "./pages/RegisterPage";
import {ConfirmPage} from "./pages/ConfirmPage";
import {Preloader} from "./components/common/Preloader";
import {CustomersPage} from "./pages/Admin/CustomersPage";

const TempMain = () => <div>Dima is chort</div>;

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
                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
            </Routes>
        </Box>
    </Stack>;
}
