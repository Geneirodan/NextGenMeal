import {Stack, Typography} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";

export const Errors = ({errors}) => {
    const {t} = useTranslation()
    if (errors && errors["Common"])
        return <Stack spacing={2}>
            {errors["Common"].map(error =>
                <Typography variant="body1" align="center">
                    {t(error)}
                </Typography>)}
        </Stack>;
};