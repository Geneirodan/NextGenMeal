import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import React, {memo, useEffect} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import {CustomTextField} from "../inputs/TextFields";
import Button from "@mui/material/Button";
import {Errors} from "../Errors";
import {resetErrors, selectors} from "../../../store/service/caterings";
import {useDispatch, useSelector} from "react-redux";
import {selector} from "../../../store/service/caterings";

const TerminalEditDialogComponent = memo(
    ({formik, onClose, open, errors}) => {
        const {t} = useTranslation()
        return <Dialog open={open} keepMounted onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogTitle>{t("Edit terminal")}</DialogTitle>
                    <Stack spacing={2}>
                        <Errors errors={errors} t={t}/>
                        <CustomTextField name="serialNumber" formik={formik} label={t("SerialNumber")}/>
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
export const TerminalEditDialog = ({terminal, open, onClose}) => {
    const errors = useSelector(selector("errors"))
    const dispatch = useDispatch()
    const onSubmit = (values) => {
        console.log(values)
    }
    const formik = useFormik({initialValues: terminal, onSubmit})
    useEffect(() => () => {
        dispatch(resetErrors());
    }, [])
    useEffect(() => {
        open && formik.resetForm();
    }, [open])
    return <TerminalEditDialogComponent open={open} onClose={onClose} formik={formik} errors={errors}/>;
};