import React, {memo, useCallback} from "react";
import {Button, Card, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs/esm";
import utc from "dayjs/plugin/utc";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import {DishListComponent} from "../buttons/DishListButton";
import {DishesIconButton} from "../buttons/IconButtons";
import {useOpen} from "../../../utils/hook/hooks";
import {useDispatch} from "react-redux";
import {pay} from "../../../store/customer/orders";

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
        return <Card sx={{padding: 1}}>
            <Stack direction="row" alignItems="center">
                <Typography flexGrow="1">
                    {formattedTime}<br/>
                    {`$${(order.price)}`}
                </Typography>
                {order.isBox && <Inventory2Icon/>}
                <DishesIconButton onClick={onClick}/>
                <Chip label={order.status} />
            </Stack>
            <Dialog open={open} keepMounted onClose={onClose}>
                <DialogTitle>{t("Dishes")}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {order.orderDishes.map(itemCallback)}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        {t("Close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    }
)