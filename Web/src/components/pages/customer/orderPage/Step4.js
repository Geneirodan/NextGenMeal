import {useTranslation} from "react-i18next";
import {Container, Stack, Typography} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import React, {memo, useCallback} from "react";
import {DishListComponent} from "../../../common/buttons/DishListButton";
import {resetErrors, selector} from "../../../../store/customer/new_order";
import {Errors} from "../../../common/Errors";
import {useErrors} from "../../../../utils/hook/hooks";

export const Step4 = memo(
    ({formik}) => {
        const {t, i18n} = useTranslation()
        const errors = useErrors(selector, resetErrors);
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
        return (
            <Container>
                <Stack spacing={2}>
                    <Errors errors={errors}/>
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
                    {
                        formik.values.orderDishes.map(handleDish)
                    }
                </Stack>
            </Container>
        )
    }
)