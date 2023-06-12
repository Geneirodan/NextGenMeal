import {useTranslation} from "react-i18next";
import {Alert, Button, Container, FormControlLabel, Snackbar, Stack, Switch, Typography} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import React, {memo, useCallback} from "react";
import {DishListComponent} from "../../../common/buttons/DishListButton";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {bottomFabStyle, leftFabStyle, rightFabStyle} from "../../../common/buttons/AddFab";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import {useUpdate} from "../../../../utils/hook/hooks";
import {useNavigate} from "react-router-dom";

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

export const Step4 = memo(
    ({formik, backStep}) => {
        const {t, i18n} = useTranslation()
        const updated = useUpdate()
        const reduceCallback = useCallback(
            (s, x) => s + x.dish.price * x.quantity,
            []
        )
        const price = formik.values.orderDishes.reduce(reduceCallback, 0)
        const onChange = useCallback(
            value => formik.setFieldValue("time", value.toString()),
            [formik]
        )
        const handleDish = useCallback(
            value => <DishListComponent dish={value.dish} quantity={value.quantity} readonly/>,
            []
        )
        return <>
            <Container>
                <Stack spacing={2}>
                    <Typography>
                        {t("Your price")}: ${price}
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.resolvedLanguage}>
                        <DateTimePicker disablePast
                                        label={t("Choose date and time")}
                                        value={formik.values.time}
                                        onChange={onChange}
                                        slotProps={{
                                            textField: {
                                                error: formik.touched.time && Boolean(formik.errors.time),
                                                helperText: formik.touched.time && formik.errors.time
                                            }
                                        }}/>
                    </LocalizationProvider>
                    <Typography>
                        {t("Your dishes")}:
                    </Typography>
                    {formik.values.orderDishes.map(handleDish)}
                    <FormControlLabel
                        control={<Switch name="isBox" checked={formik.values.isBox} onChange={formik.handleChange}/>}
                        label={t("Pack in box")}/>
                </Stack>
            </Container>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={bottomFabStyle} alignItems="end">
                <Button variant="contained" onClick={backStep} sx={leftFabStyle}>
                    <KeyboardArrowLeft/> {t("Back")}
                </Button>
                <Button variant="contained" type="submit" sx={rightFabStyle}>
                    {t("Finish")}
                </Button>
            </Stack>
            <SuccessSnackbar open={updated}/>
        </>
    }
)