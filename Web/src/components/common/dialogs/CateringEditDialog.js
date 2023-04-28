import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React, {memo} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {CustomTextField} from "../inputs/TextFields";
import Button from "@mui/material/Button";
import {selector} from "../../../store/service/menu";
import {Errors} from "../Errors";
import {useSelector} from "react-redux";

const CateringEditDialogComponent = memo(
    ({formik, onClose, open, errors}) => {
        const {t} = useTranslation()
        return <Dialog open={open} keepMounted onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogTitle>{t("Edit catering")}</DialogTitle>
                    <Stack spacing={2}>
                        <Errors errors={errors} t={t}/>
                        <CustomTextField name="name" formik={formik} label={t("Name")}/>
                        <CustomTextField name="street" formik={formik} label={t("Street")}/>
                        <CustomTextField name="city" formik={formik} label={t("City")}/>
                        <CustomTextField name="state" formik={formik} label={t("State")}/>
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
export const CateringEditDialog = ({catering, open, onClose}) => {
    const errors = useSelector(selector("errors"))
    const onSubmit = values => {
        console.log(values)
    }
    const formik = useFormik({initialValues: catering, onSubmit})
    return <CateringEditDialogComponent open={open} onClose={onClose} formik={formik} errors={errors}/>;
};