import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React from "react";
import {CustomTextField} from "../inputs/CustomTextField";
import {resetErrors, selector} from "../../../store/service/menu";
import {useSelector} from "react-redux";
import {EditDialog} from "../EditDialog";
import {useErrors} from "../../../utils/hook/UseErrors";

export const CateringEditDialog = ({catering, open, onClose, onSubmit}) => {
    const errors = useSelector(selector("errors"))
    const {t} = useTranslation()
    const title = catering ? t("Add catering") : t("Edit catering")
    let initialValues = {
        name: null,
        street: null,
        city: null,
        state: null,
        ...catering
    }
    const formik = useFormik({initialValues, onSubmit})
    const fields = [
        <CustomTextField name="name" formik={formik} label={t("Name")}/>,
        <CustomTextField name="street" formik={formik} label={t("Street")}/>,
        <CustomTextField name="city" formik={formik} label={t("City")}/>,
        <CustomTextField name="state" formik={formik} label={t("State")}/>
    ]
    useErrors(open, formik.resetForm, resetErrors);
    return <EditDialog title={title}
                       open={open}
                       onClose={onClose}
                       formik={formik}
                       errors={errors}
                       fields={fields}/>;
};