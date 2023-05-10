import React, {memo} from "react";
import {Card, CardActionArea, Typography} from "@mui/material";

export const ServiceListButton = memo(
    ({service, onClick}) =>
        <Card>
            <CardActionArea sx={{padding: 1}} onClick={onClick}>
                <Typography>
                    {service.name}
                </Typography>
                <Typography>
                    {service.country}
                </Typography>
            </CardActionArea>
        </Card>
)