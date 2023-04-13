import React from 'react';
import {useFormik} from 'formik';
import {Button, Container, Stack, SvgIcon, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Navigate, NavLink} from "react-router-dom";
import {ReactComponent as GoogleIcon} from "../img/google.svg"
import {useDispatch, useSelector} from "react-redux";
import {emailValidation, passwordValidation} from "../utils/validation";
import {Errors} from "../components/common/Errors";
import {EmailTextField, PasswordTextField} from "../components/common/TextFields";
import * as yup from "yup";
import {userSelectors} from "../store/user/selectors";
import {login} from "../store/user/thunks";

export const LoginPage = () => {
  const errors = useSelector(userSelectors.errors)
  const role = useSelector(userSelectors.role)
  const {t} = useTranslation();
  const dispatch = useDispatch()

  const initialValues = {email: '', password: ''};
  const validationSchema = yup.object({email: emailValidation(t), password: passwordValidation(t)});
  const onSubmit = (values) => {
    dispatch(login(values));
  };
  const formik = useFormik({initialValues, validationSchema, onSubmit});

  return role ? <Navigate to={"/"}/> : (
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
  );
};
