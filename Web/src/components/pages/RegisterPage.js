import React from 'react';
import {useFormik} from 'formik';
import {useTranslation} from "react-i18next";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {confirmPasswordValidation, emailValidation, stringRequired, passwordValidation} from "../../utils/validation";
import * as yup from "yup";
import {register, selectors} from "../../store/account/register";
import {selectors as authSelectors} from "../../store/account/login"
import {Button, Container, Stack, Typography} from "@mui/material";
import {Errors} from "../common/Errors";
import {CustomTextField} from "../common/inputs/CustomTextField";


export const RegisterPageComponent = ({errors, formik, t}) => <form onSubmit={formik.handleSubmit}>
    <Container maxWidth="sm">
        <Stack spacing={4}>
            <Typography variant="h3" align="center">
                {t("Register")}
            </Typography>
            <Errors errors={errors} t={t}/>
            <CustomTextField name="name" formik={formik} label={t("Name")}/>
            <CustomTextField name="email" formik={formik} label={t("Email")}/>
            <CustomTextField name="password" type="password" formik={formik} label={t("Password")}/>
            <CustomTextField name="confirmPassword" type="password" formik={formik} label={t("Confirm password")}/>
            <Stack spacing={2}>
                <Button variant="contained" type="submit">
                    {t("Sign up")}
                </Button>
            </Stack>
        </Stack>
    </Container>
</form>;
export const RegisterPage = () => {
    const errors = useSelector(selectors.errors)
    const role = useSelector(authSelectors.role)
    const isRegistered = useSelector(selectors.registered)
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const validationSchema = yup.object({
        name: stringRequired(t),
        email: emailValidation(t),
        password: passwordValidation(t),
        confirmPassword: confirmPasswordValidation(t)
    });
    const onSubmit = (values) => {
        dispatch(register(values));
    };
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    useEffect(() => () => formik.resetForm(), [])
    return isRegistered
        ? <Navigate to={"/register/confirm"}/>
        : role
            ? <Navigate to={"/"}/>
            : <RegisterPageComponent formik={formik} errors={errors} t={t}/>;

};

