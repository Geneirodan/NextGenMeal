import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import {DishEditDialog} from "../dialogs/DishEditDialog";
import EditIcon from "@mui/icons-material/Edit";
import React, {memo, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {editDish, resetErrors} from "../../../store/service/menu";

const DishListComponent = ({dish, onClick, onClose, open, onSubmit}) =>
    <Card sx={{padding: 1}}>
        <Stack direction="row" alignItems="center">
            <Box sx={{flexGrow: 1}}>
                <Typography>
                    {dish.name}
                </Typography>
                <Typography>
                    {`$${(dish.price)}, ${(dish.portion)} g, ${(dish.type)}`}
                </Typography>
                <Typography>
                    {dish.description}
                </Typography>
            </Box>
            <DishEditDialog dish={dish} open={open} onClose={onClose} onSubmit={onSubmit}/>
            <IconButton onClick={onClick}>
                <EditIcon/>
            </IconButton>
        </Stack>
    </Card>

const MemoizedDishListComponent = memo(DishListComponent)
export const DishListItem = ({dish}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const onClick = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const onSubmit = values => {
        console.log(values)
        dispatch(editDish(values))
        onClose()
    }
    return <MemoizedDishListComponent dish={dish} open={open} onClose={onClose} onClick={onClick} onSubmit={onSubmit}/>
}