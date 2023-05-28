import React, {memo, useCallback} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Chip, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs/esm";
import utc from "dayjs/plugin/utc";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import {DishListComponent} from "../buttons/DishListButton";
import {useOpen} from "../../../utils/hook/hooks";
import {useDispatch} from "react-redux";
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
        const [open, onClick, onClose] = useOpen()
        const dispatch = useDispatch()
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
                            {t("Order")} №{order.id}<br/>
                            {t("Time")}: {formattedTime}<br/>
                            {t("Price")}: {`$${(order.price)}`}
                        </Typography>
                        {order.isBox && <Inventory2Icon/>}
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