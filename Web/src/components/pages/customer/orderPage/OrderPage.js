import {withRole} from "../../../../utils/hoc/withAuth";
import React, {useCallback, useEffect, useState} from "react";
import {Alert, AlertTitle, AppBar, Box, Button, Snackbar, Stack, Step, StepLabel, Stepper} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import 'dayjs/locale/uk'
import 'dayjs/locale/en'
import {Step1} from "./Step1";
import {Step2} from "./Step2";
import {Step3} from "./Step3";
import {Step4} from "./Step4";
import StarIcon from '@mui/icons-material/Star';
import {OptimalDialog} from "./OptimalDialog";
import {useDispatch, useSelector} from "react-redux";
import {getOptimalDishes, selector} from "../../../../store/customer/order";
import * as yup from "yup";
import {stringRequired} from "../../../../utils/validation";
import {Errors} from "../../../common/Errors";

const ErrorsSnackbar = ({errors, onClose, open}) => {
    const {t} = useTranslation()
    return <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
        <Alert severity="error">
            <AlertTitle>{t("Error")}</AlertTitle>
            <Errors errors={errors}/>
        </Alert>
    </Snackbar>;
};

export const OrderPage = withRole("Customer")(() => {
    const {t} = useTranslation()
    const optimalDishes = useSelector(selector("optimalDishes"))
    const [activeStep, setActiveStep] = React.useState(0)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const onClick = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const errors = useSelector(selector("errors"))
    const steps = [t('Select service'), t('Select catering'), t('Select dishes'), t('Submit order')];
    const initialValues = {
        time: null,
        cateringId: null,
        orderDishes: []
    }
    let validationSchema;
    validationSchema = yup.object({
        time: stringRequired(t),
        orderDishes: yup.array().required(t('Required')).min(1, t('Required'))
    });
    const handleNext = () => setActiveStep((prevState) => prevState + 1)
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const onSubmit = useCallback(values => {
        console.info(values)
    }, [])
    const formik = useFormik({initialValues, validationSchema, onSubmit})
    const onSubmitOptimal = useCallback(async values => {
        const ok = await dispatch(getOptimalDishes(values))
        if(ok){
            handleNext()
            onClose()
        }
    }, [formik])
    useEffect(() => {
        formik.setValues({
            cateringId: formik.values.cateringId,
            orderDishes: optimalDishes
        })
    }, [optimalDishes])
    useEffect(() => console.info(formik.values), [formik])
    const [disableNext, setDisableNext] = useState(true)
    const stepsComponents = [
        <Step1 nextStep={handleNext} formik={formik}/>,
        <Step2 nextStep={handleNext} formik={formik}/>,
        <Step3 formik={formik}/>,
        <Step4 formik={formik}/>
    ]
    const [alert, setAlert] = useState(false)
    const onAlertClose = useCallback(() => setAlert(false), [])
    useEffect(() => {
        console.info(errors)
        errors && setAlert(!!errors.length)
    }, [errors])
    return <form onSubmit={formik.handleSubmit} style={{height: "100%"}}>
        <Stack sx={{width: '100%', height: '100%'}} spacing={2} useFlexGap>
            <Stepper activeStep={activeStep}>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{flexGrow: 1}} flexItem>
                {stepsComponents[activeStep]}
            </Box>
            <AppBar position="sticky" color="primary" sx={{top: 'auto', bottom: 0}}>
                <Stack direction="row" sx={{width: '100%'}} useFlexGap flexWrap="wrap" justifyContent="space-between"
                       padding={2}>
                    <Button color="inherit" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft/> Back
                    </Button>
                    {activeStep === 2 && <>
                        <Button color="inherit" onClick={onClick}>
                            <StarIcon/> Try optimal
                        </Button>
                        <Button color="inherit" onClick={handleNext} disabled={disableNext}>
                            Next <KeyboardArrowRight/>
                        </Button>
                    </>
                    }
                    {activeStep === 3 &&
                        <Button color="inherit" type="submit">
                            Finish
                        </Button>
                    }
                </Stack>
            </AppBar>
            <OptimalDialog cateringId={formik.values.cateringId} open={open} onClose={onClose}
                           onSubmit={onSubmitOptimal} errors={errors}/>
            <ErrorsSnackbar errors={errors} open={alert} onClose={onAlertClose}/>
        </Stack>
    </form>
})