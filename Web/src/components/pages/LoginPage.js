import React, {useEffect} from 'react';
import {useFormik} from 'formik';
import {Navigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {emailValidation, passwordValidation} from "../../utils/validation";
import * as yup from "yup";
import {resetErrors, selector, signIn} from "../../store/account/login";
import {useTranslation} from "react-i18next";
import {Button, Container, Stack, SvgIcon, Typography} from "@mui/material";
import {Errors} from "../common/Errors";
import {CustomTextField} from "../common/inputs/CustomTextField";
import {ReactComponent as GoogleIcon} from "../../img/google.svg"
import {baseUrl} from "../../api/api"
import {useErrors} from "../../utils/hook/hooks";

export const LoginPageComponent = React.memo(
    ({errors, formik, t}) => (
        <form onSubmit={formik.handleSubmit}>
            <Container maxWidth="sm">
                <Stack spacing={4}>
                    <Typography variant="h3" align="center">
                        {t("Login")}
                    </Typography>
                    <Errors errors={errors}/>
                    <CustomTextField name="email" formik={formik} label={t("Email")}/>
                    <CustomTextField name="password" type="password" formik={formik} label={t("Password")}/>
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
                                href={`${baseUrl}Account/GoogleAuth?returnUrl=${window.location.href}`}
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
export const LoginPage = () => {
    const errors = useErrors(selector, resetErrors)
    const role = useSelector(selector("role"))
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const initialValues = {email: '', password: ''};
    const validationSchema = yup.object({email: emailValidation(t), password: passwordValidation(t)});
    const onSubmit = (values) => {
        dispatch(signIn(values));
    };
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    useEffect(() => () => formik.resetForm(), [])
    return role ? <Navigate to={"/"}/> : <LoginPageComponent formik={formik} errors={errors} t={t}/>;
};
