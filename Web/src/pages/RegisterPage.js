import React from 'react';
import {useFormik} from 'formik';
import {Button, Container, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {confirmPasswordValidation, emailValidation, nameValidation, passwordValidation} from "../utils/validation";
import {Errors} from "../components/common/Errors";
import {
  ConfirmPasswordTextField,
  EmailTextField,
  NameTextField,
  PasswordTextField
} from "../components/common/TextFields";
import * as yup from "yup";
import {userSelectors} from "../store/user/selectors";
import {register} from "../store/user/thunks";

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

  if (isRegistered)
    return <Navigate to={"/register/confirm"}/>;

  return role ? <Navigate to={"/"}/> : <form onSubmit={formik.handleSubmit}>
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
};
