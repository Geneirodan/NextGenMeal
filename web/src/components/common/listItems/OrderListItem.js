import React, {memo, useCallback} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Chip, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs/esm";
import utc from "dayjs/plugin/utc";
import Inventory2Icon from "@mui/icons-material/Inventory2Outlined";
import {DishListComponent} from "../buttons/DishListButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

dayjs.extend(utc)

const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
};


export const OrderListItem = memo(
    ({order}) => {
        const {t, i18n} = useTranslation()
        console.log(order);
        const date = dayjs.utc(order.time).toDate();
        const formattedTime = Intl.DateTimeFormat(i18n.resolvedLanguage, options).format(date)
        const itemCallback = useCallback(
            value => <DishListComponent dish={value.dish} quantity={value.quantity} readonly/>,
            []
        )
        return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Stack direction="row" alignItems="center" flexGrow={1}>
                        <Typography flexGrow={1}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography>
                                    {t("Order")} №{order.id}
                                </Typography>
                                {order.isBox && <Inventory2Icon fontSize="small" color="primary"/>}<br/>
                            </Stack>
                            {t("Time")}: {formattedTime}<br/>
                            {t("Price")}: {`$${(order.price)}`}
                        </Typography>
                        <Chip label={order.status}/>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={2}>
                        {order.orderDishes.map(itemCallback)}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        )
    }
)