import {Stack, Typography} from "@mui/material";
import React from "react";

export const renderError = t => error => <Typography variant="body1" align="center">
    {t(error)}
</Typography>

export const Errors = props => {
    if (props.errors && props.errors["Common"])
        return <Stack spacing={2}>
            {props.errors["Common"].map(renderError(props.t))}
        </Stack>;
};