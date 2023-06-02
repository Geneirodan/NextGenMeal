import {useTranslation} from "react-i18next";
import {Alert, AlertTitle, Snackbar, Stack, Typography} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {useErrors} from "../../utils/hook/hooks";
import {resetErrors, selector} from "../../store/common";

export const ErrorsSnackbar = () => {
    const {t} = useTranslation()
    const [open, setAlert] = useState(false)
    const onClose = useCallback(
        () => setAlert(false),
        []
    )
    const errors = useErrors(selector, resetErrors);
    useEffect(
        () => {
            errors && setAlert(Boolean(errors["Common"]?.length));
        },
        [errors]
    )
    return (
        <Snackbar open={open}
                  autoHideDuration={5000}
                  onClose={onClose}
                  anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
            <Alert severity="error">
                <AlertTitle>{t("Error")}</AlertTitle>
                <Stack spacing={2}>
                    {errors && errors["Common"]?.map(error =>
                        <Typography variant="body1" align="center" key={error}>
                            {t(error)}
                        </Typography>)}
                </Stack>
            </Alert>
        </Snackbar>
    );
};