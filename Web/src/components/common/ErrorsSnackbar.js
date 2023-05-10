import {useTranslation} from "react-i18next";
import {Alert, AlertTitle, Snackbar} from "@mui/material";
import {Errors} from "./Errors";
import React from "react";

export const ErrorsSnackbar = ({errors, onClose, open}) => {
    const {t} = useTranslation()
    return (
        <Snackbar open={open}
                  autoHideDuration={5000}
                  onClose={onClose}
                  anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
            <Alert severity="error">
                <AlertTitle>{t("Error")}</AlertTitle>
                <Errors errors={errors}/>
            </Alert>
        </Snackbar>
    );
};