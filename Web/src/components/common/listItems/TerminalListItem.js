import {useTranslation} from "react-i18next";
import React, {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {TerminalEditDialog} from "../dialogs/TerminalEditDialog";
import {useDispatch} from "react-redux";
import {deleteTerminal, editTerminal} from "../../../store/service/caterings";

function TerminalListComponent({title, terminal, open, onEdit, onDelete, onClose, onBoxesButtonClick, onSubmit}) {
    return <Card sx={{padding: 1}}>
        <Stack direction="row" alignItems="center">
            <Box sx={{flexGrow: 1}}>
                <Typography>
                    {title}:
                </Typography>
                <Typography>
                    {terminal.serialNumber}
                </Typography>
            </Box>
            <TerminalEditDialog terminal={terminal} open={open} onClose={onClose}
                                onSubmit={onSubmit}/>
            <IconButton onClick={onEdit}>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={onBoxesButtonClick}>
                <Inventory2Icon/>
            </IconButton>
            <IconButton onClick={onDelete}>
                <DeleteIcon/>
            </IconButton>
        </Stack>
    </Card>;
}

export const TerminalListItem = ({terminal}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const onEdit = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const navigate = useNavigate()
    const onBoxesButtonClick = useCallback(() => navigate(`${terminal.id}/boxes`), [terminal.id])
    const onSubmit = useCallback(values => {
            dispatch(editTerminal(values))
            onClose()
        },
        [dispatch, onClose])
    const onDelete = useCallback(() => {
            dispatch(deleteTerminal(terminal.id))
        },
        [dispatch, terminal.id])
    return <TerminalListComponent terminal={terminal}
                                  open={open}
                                  onEdit={onEdit}
                                  onClose={onClose}
                                  onBoxesButtonClick={onBoxesButtonClick}
                                  onSubmit={onSubmit}
                                  onDelete={onDelete}
                                  title={t("Terminal")}/>;
};