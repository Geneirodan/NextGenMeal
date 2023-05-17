import {withRole} from "../../../../utils/hoc/withAuth";
import React, {memo, useCallback, useEffect, useState} from "react";
import {Alert, AppBar, Box, Button, Snackbar, Stack, Step, StepLabel, Stepper} from "@mui/material";
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
import {OptimalDialog} from "../../../common/dialogs/OptimalDialog";
import {useDispatch, useSelector} from "react-redux";
import {addOrder, getOptimalDishes, resetErrors, selector, setUpdated} from "../../../../store/customer/new_order";
import * as yup from "yup";
import {stringRequired} from "../../../../utils/validation";
import {useErrors, useOpen, useStepping, useUpdate} from "../../../../utils/hook/hooks";
import {ErrorsSnackbar} from "../../../common/ErrorsSnackbar";
import {useNavigate} from "react-router-dom";
import {roles} from "../../../../utils/constants";

const StepperComponent = memo(
    ({activeStep}) => {
        const {t} = useTranslation()
        const steps = [t('Select service'), t('Select catering'), t('Select dishes'), t('Submit order')];
        return <Stepper activeStep={activeStep}>
            {
                steps.map(
                    label => (
                        <Step key={label}>
                            <StepLabel>
                                {label}
                            </StepLabel>
                        </Step>
                    )
                )
            }
        </Stepper>
    }
)

const BottomButtons = memo(
    ({activeStep, disabled, handleBack, onOptimalClick, handleNext}) => {
        const {t} = useTranslation()
        return (
            <AppBar position="sticky" color="primary" sx={{top: "auto", bottom: 0}}>
                <Stack direction="row" justifyContent="space-between" padding={2}>
                    <Button color="inherit" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft/> {t("Back")}
                    </Button>
                    {
                        activeStep === 2 &&
                        <>
                            <Button color="inherit" onClick={onOptimalClick}>
                                <StarIcon/> {t("Try optimal")}
                            </Button>
                            <Button color="inherit" onClick={handleNext} disabled={disabled}>
                                {t("Next")} <KeyboardArrowRight/>
                            </Button>
                        </>
                    }
                    {
                        activeStep === 3 &&
                        <Button color="inherit" type="submit">
                            {t("Finish")}
                        </Button>
                    }
                </Stack>
            </AppBar>
        )
    }
)

const SuccessSnackbar = memo(
    ({open}) => {
        const {t} = useTranslation()
        const navigate = useNavigate()
        const dispatch = useDispatch()
        const onClose = useCallback(
            () => navigate("/my_orders"),
            []
        )
        return (
            <Snackbar open={open}
                      autoHideDuration={6000}
                      onClose={onClose}
                      anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                <Alert onClose={onClose} severity="success">
                    {t("Successfully created")}
                </Alert>
            </Snackbar>
        )
    }
)

export const NewOrderPage = memo(
    withRole(roles.Customer)(
        () => {
            const {t} = useTranslation()
            const dispatch = useDispatch()

            const orderDishes = useSelector(selector("selectedDishes"))
            const updated = useUpdate(selector);
            const errors = useErrors(selector, resetErrors);

            const [open, onClick, onClose] = useOpen();
            const [step, handleNext, handleBack] = useStepping();

            const [alert, setAlert] = useState(false)
            const onAlertClose = useCallback(
                () => setAlert(false),
                []
            )

            const initialValues = {
                time: null,
                cateringId: null,
                isBox: false,
                orderDishes: []
            }
            const validationSchema = yup.object({
                time: stringRequired(t),
                orderDishes: yup.array().required(t('Required')).min(1, t('Required'))
            });
            const onSubmit = useCallback(
                values => {
                    dispatch(addOrder(values))
                },
                [dispatch]
            )
            const formik = useFormik({initialValues, validationSchema, onSubmit})

            useEffect(
                () => {
                    formik.setValues({
                        ...formik.values,
                        orderDishes: Object.values(orderDishes).filter(x => x !== undefined)
                    })
                },
                [orderDishes]
            )
            const [disableNext, setDisableNext] = useState(true)
            useEffect(
                () => setDisableNext(!formik.values.orderDishes.length),
                [formik]
            )

            const stepsComponents = [
                <Step1 nextStep={handleNext} formik={formik}/>,
                <Step2 nextStep={handleNext} formik={formik}/>,
                <Step3 formik={formik}/>,
                <Step4 formik={formik}/>
            ]
            useEffect(
                () => setAlert(Boolean(errors?.length)),
                [errors]
            )

            const onSubmitOptimal = useCallback(
                async values => {
                    const ok = await dispatch(getOptimalDishes(values))
                    if (ok) {
                        handleNext()
                        onClose()
                    }
                },
                [formik, handleNext, onClose, dispatch]
            )
            useEffect(
                () =>
                    () => {
                        dispatch(setUpdated(false))
                    },
                []
            )
            return (
                <form onSubmit={formik.handleSubmit} style={{height: "100%"}}>
                    <Stack sx={{width: '100%', height: '100%'}} spacing={2}>
                        <StepperComponent activeStep={step}/>
                        <Box flexGrow="1">
                            {stepsComponents[step]}
                        </Box>
                        <BottomButtons handleBack={handleBack}
                                       activeStep={step}
                                       onOptimalClick={onClick}
                                       handleNext={handleNext}
                                       disabled={disableNext}/>
                        <OptimalDialog cateringId={formik.values.cateringId}
                                       open={open}
                                       onClose={onClose}
                                       onSubmit={onSubmitOptimal}
                                       errors={errors}/>
                        <ErrorsSnackbar errors={errors} open={alert} onClose={onAlertClose}/>
                        <SuccessSnackbar open={updated}/>
                    </Stack>
                </form>
            )
        }
    )
)