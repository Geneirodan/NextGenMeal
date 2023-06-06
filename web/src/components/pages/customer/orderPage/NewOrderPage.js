import {withRole} from "../../../../utils/hoc/withRole";
import React, {memo, useCallback, useEffect} from "react";
import {Alert, Box, Snackbar, Stack, Step, StepLabel, Stepper} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import 'dayjs/locale/uk'
import 'dayjs/locale/en'
import {Step1} from "./Step1";
import {Step2} from "./Step2";
import {Step3} from "./Step3";
import {Step4} from "./Step4";
import {useDispatch, useSelector} from "react-redux";
import {addOrder, selector} from "../../../../store/order";
import * as yup from "yup";
import {stringRequired} from "../../../../utils/validation";
import {useStepping, useUpdate} from "../../../../utils/hook/hooks";
import {ErrorsSnackbar} from "../../../common/ErrorsSnackbar";
import {useNavigate} from "react-router-dom";
import {roles} from "../../../../utils/constants";
import {setUpdated} from "../../../../store/common";

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


const SuccessSnackbar = memo(
    ({open}) => {
        const {t} = useTranslation()
        const navigate = useNavigate()
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
            const updated = useUpdate()

            const [step, handleNext, handleBack] = useStepping();

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

            const stepsComponents = [
                <Step1 formik={formik} nextStep={handleNext}/>,
                <Step2 formik={formik} nextStep={handleNext} backStep={handleBack}/>,
                <Step3 formik={formik} nextStep={handleNext} backStep={handleBack}/>,
                <Step4 formik={formik} backStep={handleBack}/>
            ]
            useEffect(
                () =>
                    () => {
                        dispatch(setUpdated(false))
                    },
                []
            )
            return (
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <StepperComponent activeStep={step}/>
                        <Box flexGrow="1">
                            {stepsComponents[step]}
                        </Box>
                        <ErrorsSnackbar/>
                        <SuccessSnackbar open={updated}/>
                    </Stack>
                </form>
            )
        }
    )
)