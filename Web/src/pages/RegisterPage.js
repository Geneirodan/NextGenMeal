import React from 'react';
import {useFormik} from 'formik';
import {useTranslation} from "react-i18next";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {confirmPasswordValidation, emailValidation, nameValidation, passwordValidation} from "../utils/validation";
import * as yup from "yup";
import {userSelectors} from "../store/user/selectors";
import {register} from "../store/user/thunks";
import {RegisterPageComponent} from "../components/pages/RegisterPageComponent";


export const RegisterPage = () => {
    const errors = useSelector(userSelectors.errors)
    const role = useSelector(userSelectors.role)
    const isRegistered = useSelector(userSelectors.registered)
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const validationSchema = yup.object({
        name: nameValidation(t),
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

