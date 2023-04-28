import {useTranslation} from "react-i18next";
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {CustomTextField} from "../inputs/TextFields";
import {CustomSelect} from "../inputs/CustomSelect";
import Button from "@mui/material/Button";
import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editDish, resetErrors, selector} from "../../../store/service/menu";
import {useFormik} from "formik";
import {Errors} from "../Errors";

const DishEditDialogComponent = memo(
    ({formik, items, onClose, open, errors}) => {
        const {t} = useTranslation()
        return <Dialog open={open} keepMounted onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogTitle>{t("Edit dish")}</DialogTitle>
                    <Stack spacing={2}>
                        <Errors errors={errors} t={t}/>
                        <CustomTextField name="name" formik={formik} label={t("Name")}/>
                        <CustomTextField name="price" type="number" formik={formik} label={t("Price")}/>
                        <CustomTextField name="portion" type="number" formik={formik} label={t("Portion")}/>
                        <CustomTextField name="description" type="multiline" formik={formik} label={t("Description")}/>
                        <CustomSelect name="type" label={t("Type")} formik={formik} items={items}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Revert</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </form>
        </Dialog>;
    }
)
export const DishEditDialog = ({dish, open, onClose, onSubmit}) => {
    const types = useSelector(selector("types"))
    const errors = useSelector(selector("errors"))
    const dispatch = useDispatch()
    const formik = useFormik({initialValues: dish, onSubmit, enableReinitialize: true})
    useEffect(() => () => {
        dispatch(resetErrors());
    }, [])
    useEffect(() => {
        open && formik.resetForm();
    }, [open])
    return <DishEditDialogComponent open={open} onClose={onClose} formik={formik} items={types} errors={errors}/>;
};