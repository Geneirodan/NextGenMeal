import React, {memo, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {CateringEditDialog} from "../dialogs/CateringEditDialog";
import {TerminalListItem} from "./TerminalListItem";

const CateringListComponent = memo(
    ({catering, open, onClick, onClose, onMenuButtonClick}) =>
        <Card sx={{padding: 1}}>
            <Stack direction="row">
                <Box sx={{flexGrow: 1}}>
                    <Typography>
                        {catering.name}
                    </Typography>
                    <Typography>
                        {`${(catering.city)}, ${(catering.state)}, ${(catering.street)}`}
                    </Typography>
                </Box>
                <CateringEditDialog catering={catering} open={open} onClose={onClose}/>
                <IconButton onClick={onClick}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={onMenuButtonClick}>
                    <RestaurantMenuIcon/>
                </IconButton>
            </Stack>
            {catering.terminal && <TerminalListItem terminal={catering.terminal}/>}
        </Card>
)
export const CateringListItem = ({catering}) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const onClick = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const onMenuButtonClick = useCallback(() => navigate(`${catering.id}/menu`), [catering.id])
    return <CateringListComponent catering={catering} open={open} onClick={onClick} onClose={onClose}
                                  onMenuButtonClick={onMenuButtonClick}/>
}