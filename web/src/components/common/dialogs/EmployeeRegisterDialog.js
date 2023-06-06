import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React from "react";
import {CustomTextField} from "../inputs/CustomTextField";
import {EditDialog} from "./EditDialog";
import {useReset} from "../../../utils/hook/hooks";
import {
    confirmPasswordValidation,
    emailValidation,
    passwordValidation,
    stringRequired
} from "../../../utils/validation";
import * as yup from "yup";

export const EmployeeRegisterDialog = ({cateringId, open, onClose, onSubmit}) => {
    const {t} = useTranslation()
    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        cateringId
    }
    const validationSchema = yup.object({
        name: stringRequired(t),
        email: emailValidation(t),
        password: passwordValidation(t),
        confirmPassword: confirmPasswordValidation(t)
    });
    const formik = useFormik({initialValues, validationSchema, onSubmit});
    const fields = [
        <CustomTextField key="name" name="name" formik={formik} label={t("Full name")}/>,
        <CustomTextField key="email" name="email" formik={formik} label={t("Email")}/>,
        <CustomTextField key="password" name="password" type="password" formik={formik} label={t("Password")}/>,
        <CustomTextField key="confirmPassword" name="confirmPassword" type="password" formik={formik}
                         label={t("Confirm password")}/>
    ]
    useReset(open, formik.resetForm);
    return <EditDialog title={t("Add employee")} open={open} onClose={onClose} formik={formik} fields={fields}/>;
};