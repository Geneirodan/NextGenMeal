import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React from "react";
import {CustomTextField} from "../inputs/CustomTextField";
import {resetErrors, selector} from "../../../store/service/caterings";
import {useSelector} from "react-redux";
import {useErrors} from "../../../utils/hook/UseErrors";
import {EditDialog} from "../EditDialog";

export const TerminalEditDialog = ({terminal, open, onClose, onSubmit}) => {
    const errors = useSelector(selector("errors"))
    const {t} = useTranslation()
    const title = terminal ? t("Add terminal") : t("Edit terminal")
    const initialValues = {
        serialNumber: null,
        ...terminal
    }
    const formik = useFormik({initialValues, onSubmit})
    const fields = [
        <CustomTextField name="serialNumber" formik={formik} label={t("SerialNumber")}/>
    ]
    useErrors(open, formik.resetForm, resetErrors);
    return <EditDialog title={title}
                       open={open}
                       onClose={onClose}
                       formik={formik}
                       errors={errors}
                       fields={fields}/>;
};