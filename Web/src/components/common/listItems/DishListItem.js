import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import {DishEditDialog} from "../dialogs/DishEditDialog";
import EditIcon from "@mui/icons-material/Edit";
import React, {memo, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteDish, editDish} from "../../../store/service/menu";
import {useTranslation} from "react-i18next";
import {useMeasurements} from "../../../utils/hook/UseMeasurements";
import DeleteIcon from "@mui/icons-material/Delete";

const DishListComponent = memo(
    ({dish, onEdit, onDelete, onClose, open, onSubmit}) => {
        const {t} = useTranslation()
        const {m} = useMeasurements()
        return <Card sx={{padding: 1}}>
            <Stack direction="row" alignItems="center">
                <Box sx={{flexGrow: 1}}>
                    <Typography>
                        {dish.name}
                    </Typography>
                    <Typography>
                        {`$${(dish.price)}, ${m(dish.portion)}, ${(dish.type)}`}
                    </Typography>
                    <Typography>
                        {dish.description}
                    </Typography>
                </Box>
                <DishEditDialog dish={dish} open={open} onClose={onClose} onSubmit={onSubmit}/>
                <IconButton onClick={onEdit}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={onDelete(dish)}>
                    <DeleteIcon/>
                </IconButton>
            </Stack>
        </Card>;
    }
)
export const DishListItem = ({dish}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const onEdit = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const {measurements, toCI} = useMeasurements()
    const onSubmit = useCallback(values => {
            values.portion = toCI(values.portion, measurements.get())
            dispatch(editDish(values))
            onClose()
        },
        [dispatch, onClose])
    const onDelete = useCallback(({id}) =>
            () => {
                dispatch(deleteDish(id))
            },
        [dispatch])
    return <DishListComponent dish={dish} open={open} onClose={onClose} onEdit={onEdit} onSubmit={onSubmit} onDelete={onDelete}/>
}