import {Button, Container, Stack, Typography} from "@mui/material";
import {Errors} from "../common/Errors";
import {
    ConfirmPasswordTextField,
    EmailTextField,
    NameTextField,
    PasswordTextField
} from "../common/TextFields";
import React from "react";

export const RegisterPageComponent = ({errors, formik, t}) => <form onSubmit={formik.handleSubmit}>
    <Container maxWidth="sm">
        <Stack spacing={4}>
            <Typography variant="h3" align="center">
                {t("Register")}
            </Typography>
            <Errors errors={errors} t={t}/>
            <NameTextField formik={formik} label={t("Name")}/>
            <EmailTextField formik={formik} label={t("Email")}/>
            <PasswordTextField formik={formik} label={t("Password")}/>
            <ConfirmPasswordTextField formik={formik} label={t("Confirm password")}/>
            <Stack spacing={2}>
                <Button variant="contained" type="submit">
                    {t("Sign up")}
                </Button>
            </Stack>
        </Stack>
    </Container>
</form>;