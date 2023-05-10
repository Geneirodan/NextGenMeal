import React, {memo} from "react";
import {Card, CardActionArea, Chip, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs/esm";
import utc from "dayjs/plugin/utc";
import Inventory2Icon from "@mui/icons-material/Inventory2";

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
        const date = dayjs.utc(order.time).toDate();
        let formattedTime = Intl.DateTimeFormat(i18n.resolvedLanguage, options).format(date)
        return <Card>
            <CardActionArea sx={{padding: 1}}>
                <Typography>
                    {formattedTime}
                </Typography>
                <Typography>
                    {`$${(order.price)}`}
                </Typography>
                <Chip label={order.status}/>
                {order.isBox && <Inventory2Icon/>}
            </CardActionArea>
        </Card>
    }
)