import React, {memo, useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {CustomTextField} from "../../../common/inputs/CustomTextField";
import {useTranslation} from "react-i18next";
import {TypeSelect} from "../../../common/TypeSelect";
import {useFormik} from "formik";
import {numberValidation} from "../../../../utils/validation";
import * as yup from "yup";
import {Errors} from "../../../common/Errors";

const OptimalDialogComponent = memo(
    ({formik, filter, setFilter, open, onClose, errors}) => {
        const {t} = useTranslation()
        return <Dialog open={open} keepMounted onClose={onClose}>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogTitle>{t("Optimal order")}</DialogTitle>
                    <Stack spacing={2} sx={{flexGrow: 1}}>
                        <Errors errors={errors} t={t}/>
                        <TypeSelect setFilter={setFilter} filter={filter}/>
                        <CustomTextField formik={formik} name="maxPrice" label={t("Max price")}/>
                        {
                            filter.types &&
                            filter.types.map(
                                type => <CustomTextField key={type} formik={formik} name={type} label={t(type)}/>
                            )
                        }
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Revert</Button>
                    <Button type="submit" disabled={!filter.types}>Finish</Button>
                </DialogActions>
            </form>
        </Dialog>;
    }
)

export const OptimalDialog = memo(
    ({onClose, open, cateringId, onSubmit, errors}) => {
        const {t} = useTranslation()
        const [filter, setFilter] = useState({})
        const [initialValues, setInitialValues] = useState({
            cateringId,
            maxPrice: null
        })
        let spec = {maxPrice: numberValidation(t)};
        const [validationSchema, setValidationSchema] = useState(yup.object(spec));
        const formik = useFormik({initialValues, validationSchema, onSubmit, enableReinitialize: true})
        useEffect(() => {
            spec = {maxPrice: numberValidation(t)}
            let newInitValues = {cateringId, maxPrice: formik.values.maxPrice}
            filter.types && filter.types.map(type => {
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
        }, [filter.types, cateringId])

        return <OptimalDialogComponent open={open}
                                       onClose={onClose}
                                       formik={formik}
                                       setFilter={setFilter}
                                       filter={filter}
                                       errors={errors}/>
    }
)