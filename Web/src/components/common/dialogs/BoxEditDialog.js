import {useTranslation} from "react-i18next";
import {CustomTextField} from "../inputs/CustomTextField";
import React, {memo} from "react";
import {resetErrors, selector} from "../../../store/service/boxes";
import {useFormik} from "formik";
import {EditDialog} from "./EditDialog";
import {numberValidation, stringRequired} from "../../../utils/validation";
import * as yup from "yup";
import {useErrors, useReset} from "../../../utils/hook/hooks";

export const BoxEditDialog = memo(
    ({box, open, onClose, onSubmit}) => {
        const errors = useErrors(selector, resetErrors)
        const {t} = useTranslation()
        const title = box ? t("Add box") : t("Edit box")
        const initialValues = {
            price: null,
            name: null,
            description: null,
            ...box
        }
        const validationSchema = yup.object({
            name: stringRequired(t),
            price: numberValidation(t),
            description: stringRequired(t)
        });
        const formik = useFormik({initialValues, validationSchema, onSubmit})
        const fields = [
            <CustomTextField name="name" formik={formik} label={t("Name")}/>,
            <CustomTextField name="price" type="number" formik={formik} label={t("Price")}/>,
            <CustomTextField name="description" multiline formik={formik} label={t("Description")}/>,
        ]
        useReset(open, formik.resetForm);
        return <EditDialog title={title}
                           open={open}
                           onClose={onClose}
                           formik={formik}
                           errors={errors}
                           fields={fields}/>;
    }
)