import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import React, {memo, useCallback, useEffect, useState} from "react";
import {useMeasurements} from "../../../utils/hook/UseMeasurements";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const DishListComponent = ({dish, onAdd, onRemove, quantity, readonly = false}) => {
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
            {readonly || <IconButton onClick={onAdd}>
                <AddIcon/>
            </IconButton>}
            {quantity &&
                <>
                    <Typography>
                        {quantity}
                    </Typography>
                    {readonly || <IconButton onClick={onRemove}>
                        <RemoveIcon/>
                    </IconButton>}
                </>
            }
        </Stack>
    </Card>;
};

export const DishListButton = memo(
    ({dish, formik}) => {
        // const [index, setIndex] = useState(orderDishes.findIndex(orderDish => orderDish.dishId === dish.id))
        const [quantity, setQuantity] = useState(0)
        const [orderDish, setOrderDish] = useState({
            quantity: 0,
            dishId: dish.id,
            dish: dish
        })
        const onAdd = useCallback(() => {
            const {orderDishes} = formik.values
            if (orderDish.quantity === 0) {
                formik.setFieldValue('orderDishes', [...orderDishes, orderDish])
            }
            orderDish.quantity++
            setQuantity(orderDish.quantity)
        }, [orderDish.quantity, formik])
        const onRemove = useCallback(() => {
            const {orderDishes} = formik.values
            if (orderDish.quantity === 1) {
                formik.setFieldValue('orderDishes', orderDishes.filter(item => item !== orderDish))
            }
            orderDish.quantity--
            setQuantity(orderDish.quantity)
        }, [orderDish.quantity, formik])
        useEffect(() => {
            const {orderDishes} = formik.values
            //orderDishes = orderDishes.find(item => item.dishId !== dish.id)
        }, [quantity])
        return <DishListComponent dish={dish} onAdd={onAdd} quantity={quantity} onRemove={onRemove}/>;
    }
)