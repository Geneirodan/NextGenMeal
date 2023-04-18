import React from "react";
import {Button, Container, Stack, SvgIcon, Typography} from "@mui/material";
import {Errors} from "../common/Errors";
import {EmailTextField, PasswordTextField} from "../common/TextFields";
import {NavLink} from "react-router-dom";
import {ReactComponent as GoogleIcon} from "../../img/google.svg"

export const LoginPageComponent = React.memo(
    ({errors, formik, t}) => (
        <form onSubmit={formik.handleSubmit}>
            <Container maxWidth="sm">
                <Stack spacing={4}>
                    <Typography variant="h3" align="center">
                        {t("Login")}
                    </Typography>
                    <Errors errors={errors} t={t}/>
                    <EmailTextField formik={formik} label={t("Email")}/>
                    <PasswordTextField formik={formik} label={t("Password")}/>
                    <Typography variant="body1" align="center">
                        <NavLink to="/forgot">
                            {t("Forgot password?")}
                        </NavLink>
                    </Typography>
                    <Stack spacing={2}>
                        <Button variant="contained" type="submit">
                            {t("Log in")}
                        </Button>
                        <Button variant="outlined"
                                href={`https://localhost:7168/api/Account/GoogleAuth?returnUrl=${window.location.href}`}
                                startIcon={<SvgIcon component={GoogleIcon} inheritViewBox/>}>
                            {t("Continue with Google")}
                        </Button>
                    </Stack>
                    <Typography variant="body1" align="center">
                        {t("No account?")}&nbsp;
                        <NavLink to="/register">
                            {t("Create one")}
                        </NavLink>
                    </Typography>
                </Stack>
            </Container>
        </form>
    )
);