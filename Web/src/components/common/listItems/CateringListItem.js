import React, {memo, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {CateringEditDialog} from "../dialogs/CateringEditDialog";
import {TerminalListItem} from "./TerminalListItem";
import {deleteCatering, editCatering} from "../../../store/service/caterings";
import {useDispatch} from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const CateringListComponent = memo(
    ({catering, open, onEdit, onDelete, onClose, onMenuButtonClick, onSubmit}) =>
        <Card sx={{padding: 1}}>
            <Stack direction="row" alignItems="center">
                <Box sx={{flexGrow: 1}}>
                    <Typography>
                        {catering.name}
                    </Typography>
                    <Typography>
                        {`${(catering.city)}, ${(catering.state)}, ${(catering.street)}`}
                    </Typography>
                </Box>
                <CateringEditDialog catering={catering} open={open} onClose={onClose} onSubmit={onSubmit}/>
                <IconButton onClick={onEdit}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={onMenuButtonClick}>
                    <RestaurantMenuIcon/>
                </IconButton>
                <IconButton onClick={onDelete}>
                    <DeleteIcon/>
                </IconButton>
            </Stack>
            {catering.terminal && <TerminalListItem terminal={catering.terminal}/>}
        </Card>
)
export const CateringListItem = ({catering}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const onEdit = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const navigate = useNavigate()
    const onMenuButtonClick = useCallback(() => navigate(`${catering.id}/menu`), [catering.id])
    const onSubmit = useCallback(values => {
            dispatch(editCatering(values))
            onClose()
        },
        [dispatch, onClose])
    const onDelete = useCallback(() => {
            dispatch(deleteCatering(catering.id))
        },
        [dispatch, catering.id])
    return <CateringListComponent catering={catering} open={open} onEdit={onEdit} onClose={onClose}
                                  onMenuButtonClick={onMenuButtonClick} onSubmit={onSubmit} onDelete={onDelete}/>
}