import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React, {memo} from "react";
import {CustomTextField} from "../inputs/CustomTextField";
import {resetErrors, selector} from "../../../store/service/menu";
import {EditDialog} from "./EditDialog";

import {useErrors, useReset} from "../../../utils/hook/hooks";

export const CateringEditDialog = memo(
    ({catering, open, onClose, onSubmit}) => {
        const errors = useErrors(selector, resetErrors)
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
        useReset(open, formik.resetForm);
        return <EditDialog title={title}
                           open={open}
                           onClose={onClose}
                           formik={formik}
                           errors={errors}
                           fields={fields}/>
    }
)