import {IconButton} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";

export const LoginButton = props => (
    <IconButton size="large" onClick={props.onClick} color="inherit">
        <LoginIcon/>
    </IconButton>);