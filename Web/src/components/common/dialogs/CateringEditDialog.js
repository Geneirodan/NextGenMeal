import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React, {memo} from "react";
import {CustomTextField} from "../inputs/CustomTextField";
import {EditDialog} from "./EditDialog";

import {useReset} from "../../../utils/hook/hooks";

export const CateringEditDialog = memo(
    ({catering, open, onClose, onSubmit}) => {
        const {t} = useTranslation()
        const title = catering.id ? t("Edit catering") : t("Add catering")
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
        useReset(open, formik.resetForm);
        return <EditDialog title={title} open={open} onClose={onClose} formik={formik} fields={fields}/>
    }
)