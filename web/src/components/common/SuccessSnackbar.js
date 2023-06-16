import React, {memo, useCallback} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Alert, Snackbar} from "@mui/material";

export const SuccessSnackbar = memo(
    ({open}) => {
        const {t} = useTranslation()
        const navigate = useNavigate()
        const onClose = useCallback(
            () => navigate("/my_orders"),
            []
        )
        return (
            <Snackbar open={open}
                      autoHideDuration={6000}
                      onClose={onClose}
                      anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                <Alert onClose={onClose} severity="success">
                    {t("Successfully created")}
                </Alert>
            </Snackbar>
        )
    }
)