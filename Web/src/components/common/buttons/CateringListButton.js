import React, {memo} from "react";
import {Typography, Card, CardActionArea} from "@mui/material";
import {useTranslation} from "react-i18next";

export const CateringListButton = memo(
    ({catering, onClick}) => {
        const {t} = useTranslation()
        return <Card>
            <CardActionArea sx={{padding: 1}} onClick={onClick}>
                <Typography>
                    {t("Name")}: {catering.name}<br/>
                    {t("City")}: {(catering.city)}<br/>
                    {t("State")}: {(catering.state)}<br/>
                    {t("Street")}: {(catering.street)}<br/>
                    {catering.terminal && t("With terminal")}
                </Typography>
            </CardActionArea>
        </Card>
    }
)