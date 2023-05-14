import {useTranslation} from "react-i18next";
import React, {memo} from "react";
import {Box, Card, Stack, Typography} from "@mui/material";
import {TerminalEditDialog} from "../dialogs/TerminalEditDialog";
import {deleteTerminal, editTerminal} from "../../../store/service/caterings";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {RenameIconButton} from "../buttons/IconButtons";

export const TerminalListItem = memo(
    ({terminal}) => {
        const {t} = useTranslation()
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
                    <EditDialogButton EditDialog={TerminalEditDialog}
                                      EditButton={RenameIconButton}
                                      editAction={editTerminal}
                                      terminal={terminal}/>
                    <DeleteButton deleteAction={deleteTerminal} id={terminal.id}/>
                </Stack>
            </Card>
        )
    }
)