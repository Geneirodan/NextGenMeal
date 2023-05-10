import React, {memo} from "react";
import {Card, CardActionArea, Typography} from "@mui/material";

export const CateringListButton = memo(
    ({catering, onClick}) =>
        <Card>
            <CardActionArea sx={{padding: 1}} onClick={onClick}>
                <Typography>
                    {catering.name}
                </Typography>
                <Typography>
                    {`${(catering.city)}, ${(catering.state)}, ${(catering.street)}`}
                </Typography>
                {catering.terminal && <Typography>With terminal</Typography>}
            </CardActionArea>
        </Card>
)