import {useTranslation} from "react-i18next";
import React, {memo} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Stack} from "@mui/material";
import {TerminalEditDialog} from "../dialogs/TerminalEditDialog";
import {deleteTerminal, editTerminal} from "../../../store/caterings";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {RenameIconButton} from "../buttons/IconButtons";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const TerminalListItem = memo(
    ({terminal}) => {
        const {t} = useTranslation()
        return (
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    {t("Terminal")}
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" alignItems="center">
                        <Box flexGrow={1}>
                            {t("Serial number")}: {terminal.serialNumber}
                        </Box>
                        <EditDialogButton EditDialog={TerminalEditDialog}
                                          EditButton={RenameIconButton}
                                          editAction={editTerminal}
                                          terminal={terminal}/>
                        <DeleteButton deleteAction={deleteTerminal} id={terminal.id}/>
                    </Stack>
                </AccordionDetails>
            </Accordion>

        )
    }
)