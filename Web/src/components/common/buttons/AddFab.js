import {Fab} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

export const absFabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};
export const rightFabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'sticky',
};
export const leftFabStyle = {
    margin: 0,
    top: 'auto',
    right: 'auto',
    bottom: 20,
    left: 20,
    position: 'sticky',
};
export const bottomFabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 20,
    position: 'sticky',
};
export const AddFab = props => {
    return <Fab color="primary" style={absFabStyle} {...props}>
        <AddIcon/>
    </Fab>;
};