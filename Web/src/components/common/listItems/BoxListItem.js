import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {memo, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteBox, editBox} from "../../../store/service/boxes";
import {BoxEditDialog} from "../dialogs/BoxEditDialog";

const BoxListComponent = memo(
    ({box, onEdit, onDelete, onClose, open, onSubmit}) => {
        return <Card sx={{padding: 1}}>
            <Stack direction="row" alignItems="center">
                <Box sx={{flexGrow: 1}}>
                    <Typography>
                        {box.name}
                    </Typography>
                    <Typography>
                        {'$' + box.price}
                    </Typography>
                    <Typography>
                        {box.description}
                    </Typography>
                </Box>
                <BoxEditDialog box={box} open={open} onClose={onClose} onSubmit={onSubmit}/>
                <IconButton onClick={onEdit}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={onDelete(box)}>
                    <DeleteIcon/>
                </IconButton>
            </Stack>
        </Card>;
    }
)
export const BoxListItem = ({box}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const onEdit = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const onSubmit = useCallback(values => {
            dispatch(editBox(values))
            onClose()
        },
        [dispatch, onClose])
    const onDelete = useCallback(({id}) =>
            () => {
                dispatch(deleteBox(id))
            },
        [dispatch])
    return <BoxListComponent box={box} open={open} onClose={onClose} onEdit={onEdit} onDelete={onDelete}
                             onSubmit={onSubmit}/>
}