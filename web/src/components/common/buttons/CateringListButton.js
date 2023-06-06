import React, {memo} from "react";
import {Typography, Card, CardActionArea, Stack} from "@mui/material";
import {useTranslation} from "react-i18next";
import Inventory2Icon from "@mui/icons-material/Inventory2Outlined";

export const CateringListButton = memo(
    ({catering, onClick}) => {
        const {t} = useTranslation()
        return <Card>
            <CardActionArea sx={{padding: 1}} onClick={onClick}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography>
                        {t("Name")}: {catering.name}
                    </Typography>
                    {catering.terminal && <Inventory2Icon fontSize="small" color="primary"/>}<br/>
                </Stack>
                <Typography>
                    {t("City")}: {(catering.city)}<br/>
                    {t("State")}: {(catering.state)}<br/>
                    {t("Street")}: {(catering.street)}<br/>
                </Typography>
            </CardActionArea>
        </Card>
    }
)