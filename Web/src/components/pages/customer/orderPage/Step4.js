import {useTranslation} from "react-i18next";
import {Container, Stack, TextField, Typography} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import React from "react";
import {DishListButton, DishListComponent} from "../../../common/listItems/DishListButton";
import {selector} from "../../../../store/customer/order";
import {Errors} from "../../../common/Errors";
import {useSelector} from "react-redux";

export const Step4 = ({formik}) => {
    const {t, i18n} = useTranslation()
    const errors = useSelector(selector("errors"))
    return <Container>
        <Stack spacing={2}>
            <Errors errors={errors} t={t}/>
            <Typography>
                {t("Your price")}: ${formik.values.orderDishes.reduce((s, x) => s + x.dish.price * x.quantity, 0)}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.resolvedLanguage}>
                <DateTimePicker disablePast
                                label={t("Choose date and time")}
                                value={formik.values.time}
                                onChange={value => formik.setFieldValue("time", value.toString())}
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
            {formik.values.orderDishes.map(value => <DishListComponent dish={value.dish} quantity={value.quantity} readonly/>)}
        </Stack>
    </Container>
}