import {useTranslation} from "react-i18next";
import React, {memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import {TerminalEditDialog} from "../dialogs/TerminalEditDialog";
import {deleteTerminal, editTerminal} from "../../../store/service/caterings";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";

export const TerminalListItem = memo(
    ({terminal}) => {
        const {t} = useTranslation()
        const navigate = useNavigate()
        const onBoxesButtonClick = useCallback(
            () => navigate(`${terminal.id}/boxes`),
            [terminal]
        )
        return (
            <Card sx={{padding: 1}}>
                <Stack direction="row" alignItems="center">
                    <Box sx={{flexGrow: 1}}>
                        <Typography>
                            {t("Terminal")}:
                        </Typography>
                        <Typography>
                            {terminal.serialNumber}
                        </Typography>
                    </Box>
                    <EditDialogButton EditDialog={TerminalEditDialog} editAction={editTerminal} terminal={terminal}/>
                    <IconButton onClick={onBoxesButtonClick}>
                        <Inventory2Icon/>
                    </IconButton>
                    <DeleteButton deleteAction={deleteTerminal} id={terminal.id}/>
                </Stack>
            </Card>
        )
    }
)