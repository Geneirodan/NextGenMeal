import React, {memo, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Button, Card, IconButton, Stack, Typography} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {CateringEditDialog} from "../dialogs/CateringEditDialog";
import {TerminalListItem} from "./TerminalListItem";
import {addTerminal, deleteCatering, editCatering} from "../../../store/service/caterings";
import {useTranslation} from "react-i18next";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {TerminalEditDialog} from "../dialogs/TerminalEditDialog";
import PersonIcon from '@mui/icons-material/Person';


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
                <Button {...props}>
                    {t("Add terminal")}
                </Button>,
            [t]
        )
        return (
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
                    <EditDialogButton EditDialog={CateringEditDialog} editAction={editCatering} catering={catering}/>
                    <IconButton onClick={onMenuButtonClick}>
                        <RestaurantMenuIcon/>
                    </IconButton>
                    <IconButton onClick={onPersonnelButtonClick}>
                        <PersonIcon/>
                    </IconButton>
                    <DeleteButton deleteAction={deleteCatering} id={catering.id}/>
                </Stack>
                {
                    catering.terminal
                        ? <TerminalListItem terminal={catering.terminal}/>
                        : <EditDialogButton EditDialog={TerminalEditDialog}
                                            EditButton={AddTerminalButton}
                                            editAction={addTerminal}
                                            terminal={{id: catering.id}}/>
                }
            </Card>
        )
    }
)