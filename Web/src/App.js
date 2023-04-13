import './App.css';
import React, {useEffect} from "react";
import {Header} from "./components/Header/Header";
import {connect} from "react-redux";
import {Route, Routes} from 'react-router-dom'
import {Box, CssBaseline, Stack} from "@mui/material";
import {LoginPage} from "./pages/LoginPage";
import {initialize, initializedSelector} from "./store/app";
import {RegisterPage} from "./pages/RegisterPage";
import {ConfirmPage} from "./pages/ConfirmPage";
import {Preloader} from "./components/common/Preloader";

const mapStateToProps = (state) => ({
    initialized: initializedSelector(state)
})

function TempMain() {
    return <div>Dima is chort</div>;
}

const AppComponent = (props) => {
    useEffect(() => {
        props.initialize()
    },[])
    if (!props.initialized) {

        return <Preloader/>
    }
    return <Stack spacing={5}>
        <CssBaseline/>
        <Header/>
        <Box component="main">
            <Routes>
              <Route path='/' element={<TempMain/>} exact/>
              <Route path='/confirm' element={<ConfirmPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
            </Routes>
        </Box>
    </Stack>
}

export const App = connect(mapStateToProps, {initialize})(AppComponent)
