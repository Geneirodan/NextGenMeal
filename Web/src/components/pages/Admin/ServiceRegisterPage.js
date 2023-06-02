import React, {memo, useCallback, useEffect} from 'react'
import {useFormik} from 'formik'
import {useTranslation} from "react-i18next"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {confirmPasswordValidation, emailValidation, passwordValidation, stringRequired} from "../../../utils/validation"
import * as yup from "yup"
import {getCountries, selector} from "../../../store/auth"
import {Autocomplete, Button, Container, Dialog, DialogContent, Stack, TextField, Typography} from "@mui/material"
import {CustomTextField} from "../../common/inputs/CustomTextField"
import {useReset, useUpdate} from "../../../utils/hook/hooks"
import {ErrorsSnackbar} from "../../common/ErrorsSnackbar";
import {roles} from "../../../utils/constants";
import {registerService} from "../../../store/admin";
import {withRole} from "../../../utils/hoc/withRole";

export const ServiceRegisterPage = memo(
    withRole(roles.Admin)(
        () => {
            const role = useSelector(selector("role"))
            const isRegistered = useUpdate()
            const {t} = useTranslation();
            const dispatch = useDispatch()
            const navigate = useNavigate();

            const initialValues = {
                country: "",
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
            const validationSchema = yup.object({
                country: stringRequired(t),
                name: stringRequired(t),
                email: emailValidation(t),
                password: passwordValidation(t),
                confirmPassword: confirmPasswordValidation(t)
            });
            const onSubmit = useCallback(
                values => {
                    dispatch(registerService(values))
                },
                []
            )
            const formik = useFormik({initialValues, validationSchema, onSubmit});
            useReset(open, formik.resetForm);
            const countries = useSelector(selector("countries"))
            useEffect(
                () => {
                    dispatch(getCountries())
                },
                []
            )
            const onChange = useCallback(
                (e, value) => formik.setFieldValue('country', value),
                []
            )
            const renderInput = useCallback(
                params => <TextField name="country" label={t("Country")} {...params}/>,
                []
            )
            const onClose = useCallback(
                () => navigate("/admin/services"),
                []
            )
            return isRegistered
                ? <Dialog open={true} onClose={onClose}>
                    <DialogContent>
                        The confirmation link has been sent on your email.
                    </DialogContent>
                </Dialog>
                : <form onSubmit={formik.handleSubmit}>
                    <Container maxWidth="sm">
                        <Stack spacing={4}>
                            <Typography variant="h3" align="center">
                                {t("Register service")}
                            </Typography>
                            <ErrorsSnackbar/>
                            <Autocomplete value={formik.country} options={countries} onChange={onChange} renderInput={renderInput}/>
                            <CustomTextField name="name" formik={formik} label={t("Name")}/>
                            <CustomTextField name="email" formik={formik} label={t("Email")}/>
                            <CustomTextField name="password" type="password" formik={formik} label={t("Password")}/>
                            <CustomTextField name="confirmPassword" type="password" formik={formik}
                                             label={t("Confirm password")}/>
                            <Stack spacing={2}>
                                <Button variant="contained" type="submit">
                                    {t("Sign up")}
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>
                </form>

        }
    )
)