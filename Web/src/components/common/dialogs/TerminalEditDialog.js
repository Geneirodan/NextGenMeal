import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React from "react";
import {CustomTextField} from "../inputs/CustomTextField";
import {EditDialog} from "./EditDialog";
import {useReset} from "../../../utils/hook/hooks";

export const TerminalEditDialog = ({terminal, open, onClose, onSubmit}) => {
    const {t} = useTranslation()
    const title = terminal.serialNumber ? t("Edit terminal") : t("Add terminal")
    const initialValues = {
        serialNumber: null,
        ...terminal
    }
    const formik = useFormik({initialValues, onSubmit})
    const fields = [
        <CustomTextField name="serialNumber" formik={formik} label={t("SerialNumber")}/>
    ]
    useReset(open, formik.resetForm);
    return <EditDialog title={title} open={open} onClose={onClose} formik={formik} fields={fields}/>;
};