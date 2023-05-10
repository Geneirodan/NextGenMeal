import {Box, Card, Stack, Typography} from "@mui/material";
import React, {memo} from "react";
import {deleteBox, editBox} from "../../../store/service/boxes";
import {BoxEditDialog} from "../dialogs/BoxEditDialog";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";

export const BoxListItem = memo(
    ({box}) =>
        <Card sx={{padding: 1}}>
            <Stack direction="row" alignItems="center">
                <Box sx={{flexGrow: 1}}>
                    <Typography>
                        {box.name}
                    </Typography>
                    <Typography>
                        {`$${box.price}`}
                    </Typography>
                    <Typography>
                        {box.description}
                    </Typography>
                </Box>
                <EditDialogButton EditDialog={BoxEditDialog} box={box} editAction={editBox}/>
                <DeleteButton deleteAction={deleteBox} id={box.id}/>
            </Stack>
        </Card>
)