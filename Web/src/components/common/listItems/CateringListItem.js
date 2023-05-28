import React, {memo, useCallback, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Card, IconButton, Stack, Typography} from "@mui/material";
import {CateringEditDialog} from "../dialogs/CateringEditDialog";
import {TerminalListItem} from "./TerminalListItem";
import {addTerminal, deleteCatering, editCatering} from "../../../store/service/caterings";
import {useTranslation} from "react-i18next";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {TerminalEditDialog} from "../dialogs/TerminalEditDialog";
import PersonIcon from '@mui/icons-material/Person';
import {DishesIconButton} from "../buttons/IconButtons";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export const CateringListItem = memo(
    ({catering}) => {
        const {t} = useTranslation()
        const navigate = useNavigate()
        const onMenuButtonClick = useCallback(
            () => navigate(`${catering.id}/menu`),
            [catering.id]
        )
        const onPersonnelButtonClick = useCallback(
            () => navigate(`${catering.id}/personnel`),
            [catering.id]
        )

        const AddTerminalButton = useCallback(
            props =>
                <Button {...props} size="large" startIcon={<AddOutlinedIcon/>}>
                    {t("Add terminal")}
                </Button>,
            [t]
        )
        const terminal = useMemo(
            () => catering.terminal || {id: catering.id},
            [catering.terminal]
        )
        return (
            <Card p="1">
                <Stack direction="row" alignItems="center">
                    <Box sx={{flexGrow: 1}}>
                        <Typography>
                            {catering.name}
                        </Typography>
                        <Typography>
                            {`${(catering.city)}, ${(catering.state)}, ${(catering.street)}`}
                        </Typography>
                    </Box>
                    <EditDialogButton EditDialog={CateringEditDialog} editAction={editCatering} catering={catering}/>
                    <DishesIconButton onClick={onMenuButtonClick}/>
                    <IconButton onClick={onPersonnelButtonClick}>
                        <PersonIcon/>
                    </IconButton>
                    <DeleteButton deleteAction={deleteCatering} id={catering.id}/>
                </Stack>
                {
                    terminal
                        ? <TerminalListItem terminal={terminal}/>
                        : <EditDialogButton EditDialog={TerminalEditDialog}
                                            EditButton={AddTerminalButton}
                                            editAction={addTerminal}
                                            terminal={terminal}/>
                }
            </Card>
        )
    }
)