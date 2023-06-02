import {useTranslation} from "react-i18next";
import {CustomTextField} from "../inputs/CustomTextField";
import {CustomSelect} from "../inputs/CustomSelect";
import React from "react";
import {useSelector} from "react-redux";
import {useFormik} from "formik";
import {EditDialog} from "./EditDialog";
import {useMeasurements} from "../../../utils/hook/UseMeasurements";
import {numberValidation, stringRequired} from "../../../utils/validation";
import * as yup from "yup";
import {useReset} from "../../../utils/hook/hooks";
import {selector} from "../../../store/menu";

export const DishEditDialog = ({dish, open, onClose, onSubmit}) => {
    const {getUnitSymbol, toUnit} = useMeasurements()
    const types = useSelector(selector("types"))
    const {t} = useTranslation()
    const title = dish.id ? t("Edit dish") : t("Add dish")
    let initialValues = {
        price: null,
        portion: null,
        name: null,
        description: null,
        type: null,
        ...dish
    }
    if (initialValues.portion)
        initialValues.portion = toUnit(initialValues.portion)
    const validationSchema = yup.object({
        name: stringRequired(t),
        portion: numberValidation(t),
        price: numberValidation(t),
        description: stringRequired(t),
        type: stringRequired(t)
    });
    const formik = useFormik({initialValues, validationSchema, onSubmit, enableReinitialize: true})
    const fields = [
        <CustomTextField name="name" formik={formik} label={t("Name")}/>,
        <CustomTextField name="price" formik={formik} label={t("Price")}/>,
        <CustomTextField name="portion" formik={formik} label={t("Portion")} InputProps={{
            endAdornment: getUnitSymbol()
        }}/>,
        <CustomTextField name="description" type="multiline" formik={formik} label={t("Description")}/>,
        <CustomSelect name="type" label={t("Type")} formik={formik} items={types}/>
    ]
    useReset(open, formik.resetForm);
    return <EditDialog title={title} open={open} onClose={onClose} formik={formik} fields={fields}/>;
};