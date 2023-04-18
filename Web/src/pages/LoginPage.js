import React from 'react';
import {useFormik} from 'formik';
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {emailValidation, passwordValidation} from "../utils/validation";
import * as yup from "yup";
import {userSelectors} from "../store/user/selectors";
import {login} from "../store/user/thunks";
import {useTranslation} from "react-i18next";
import {LoginPageComponent} from "../components/pages/LoginPageComponent";

export const LoginPage = () => {
    const errors = useSelector(userSelectors.errors)
    const role = useSelector(userSelectors.role)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    const initialValues = {email: '', password: ''};
    const validationSchema = yup.object({email: emailValidation(t), password: passwordValidation(t)});
    const onSubmit = (values) => {
        console.log(values)
        dispatch(login(values));
    };
    const formik = useFormik({initialValues, validationSchema, onSubmit});

    return role ? <Navigate to={"/"}/> : <LoginPageComponent formik={formik} errors={errors} t={t}/>;
};
