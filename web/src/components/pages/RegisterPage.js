import React, {memo, useCallback} from 'react'
import {useFormik} from 'formik'
import {useTranslation} from "react-i18next"
import {Navigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {confirmPasswordValidation, emailValidation, passwordValidation, stringRequired} from "../../utils/validation"
import * as yup from "yup"
import {register, selector} from "../../store/auth"
import {Button, Container, Dialog, DialogContent, Stack, Typography} from "@mui/material"
import {CustomTextField} from "../common/inputs/CustomTextField"
import {useReset, useUpdate} from "../../utils/hook/hooks"
import {ErrorsSnackbar} from "../common/ErrorsSnackbar";

export const RegisterPage = memo(
    () => {
        const role = useSelector(selector("role"))
        const isRegistered = useUpdate()
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
        const onSubmit = useCallback(
            values => {
                dispatch(register(values));
            },
            []
        )
        const formik = useFormik({initialValues, validationSchema, onSubmit});
        useReset(open, formik.resetForm);
        return isRegistered
            ? <Dialog open={true} onClose={onClose}>
                <DialogContent>
                    The confirmation link has been sent on your email.
                </DialogContent>
            </Dialog>
            : role
                ? <Navigate to={"/"}/>
                : <form onSubmit={formik.handleSubmit}>
                    <Container maxWidth="sm">
                        <Stack spacing={4}>
                            <Typography variant="h3" align="center">
                                {t("Register")}
                            </Typography>
                            <ErrorsSnackbar/>
                            <CustomTextField name="name" formik={formik} label={t("Name")}/>
                            <CustomTextField name="email" formik={formik} label={t("Email")}/>
                            <CustomTextField name="password" type="password" formik={formik} label={t("Password")}/>
                            <CustomTextField name="confirmPassword" type="password" formik={formik}
                                             label={t("Confirm password")}/>
                            <Stack spacing={2}>
                                <Button variant="contained" type="submit">
                                    {t("Register")}
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>
                </form>

    }
)