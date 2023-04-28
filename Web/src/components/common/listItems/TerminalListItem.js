import {useTranslation} from "react-i18next";
import React, {memo, useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import {TerminalEditDialog} from "../dialogs/TerminalEditDialog";

const TerminalListComponent = memo(
    ({onBoxesButtonClick, terminal, open, onClick, onClose}) => {
        const {t} = useTranslation()
        return <Card
            sx={{padding: 1}}>
            <Stack direction="row">
                <Box sx={{flexGrow: 1}}>
                    <Typography>
                        {t("Terminal")}:
                    </Typography>
                    <Typography>
                        {terminal.serialNumber}
                    </Typography>
                </Box>
                <TerminalEditDialog terminal={terminal} open={open} onClose={onClose}/>
                <IconButton onClick={onClick}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={onBoxesButtonClick}>
                    <Inventory2Icon/>
                </IconButton>
            </Stack>
        </Card>;
    }
)
export const TerminalListItem = ({terminal}) => {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const onClick = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const onBoxesButtonClick = useCallback(() => navigate(`${terminal.id}/boxes`), [terminal.id])
    return <TerminalListComponent terminal={terminal} open={open} onClose={onClose} onClick={onClick}
                                  onBoxesButtonClick={onBoxesButtonClick}/>;
};