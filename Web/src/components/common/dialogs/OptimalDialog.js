import React, {memo, useCallback, useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {CustomTextField} from "../inputs/CustomTextField";
import {useTranslation} from "react-i18next";
import {TypeSelect} from "../inputs/TypeSelect";
import {useFormik} from "formik";
import {numberValidation} from "../../../utils/validation";
import * as yup from "yup";
import {Errors} from "../Errors";
import {useErrors} from "../../../utils/hook/hooks";
import {resetErrors, selector} from "../../../store/customer/new_order";

export const OptimalDialog = memo(
    ({onClose, open, cateringId, onSubmit}) => {
        const {t} = useTranslation()
        const [filter, setFilter] = useState({})
        const errors = useErrors(selector, resetErrors);
        const [initialValues, setInitialValues] = useState({
            cateringId,
            maxPrice: null
        })
        const [validationSchema, setValidationSchema] = useState(
            yup.object({
                maxPrice: numberValidation(t)
            })
        );
        const formik = useFormik({initialValues, validationSchema, onSubmit, enableReinitialize: true})
        useEffect(
            () => {
                let spec = {
                    maxPrice: numberValidation(t)
                }
                let newInitValues = {
                    cateringId,
                    maxPrice: formik.values.maxPrice
                }
                filter.types?.map(type => {
                    spec = {
                        ...spec,
                        [type]: numberValidation(t)
                    }
                    newInitValues = {
                        ...newInitValues,
                        [type]: formik.values[type]
                    }
                })
                setValidationSchema(yup.object(spec));
                setInitialValues(newInitValues)
            },
            [filter.types, cateringId, formik.values, setInitialValues, setValidationSchema]
        )

        const handleType = useCallback(
            type => <CustomTextField key={type} formik={formik} name={type} label={t(type)}/>,
            [formik, t]
        )
        return (
            <Dialog open={open} keepMounted onClose={onClose}>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <DialogTitle>
                            {t("Optimal order")}
                        </DialogTitle>
                        <Stack spacing={2} sx={{flexGrow: 1}}>
                            <Errors errors={errors}/>
                            <TypeSelect setFilter={setFilter} filter={filter}/>
                            <CustomTextField formik={formik} name="maxPrice" label={t("Max price")}/>
                            {
                                filter.types?.map(handleType)
                            }
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>
                            {t("Revert")}
                        </Button>
                        <Button type="submit" disabled={!filter.types}>
                            {t("Finish")}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }
)