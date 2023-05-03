import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import React, {memo, useCallback, useState} from "react";
import {useMeasurements} from "../../../utils/hook/UseMeasurements";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {addDish, removeDish, selector} from "../../../store/customer/order";
import {useDispatch, useSelector} from "react-redux";

export const DishListComponent = memo(
    ({dish, onAdd, onRemove, quantity, readonly = false}) => {
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
        </Card>
    }
)

export const DishListButton = (
    ({dish}) => {
        const dispatch = useDispatch()
        const selectedDishes = useSelector(selector("selectedDishes"))
        const [orderDish, setOrderDish] = useState({
            quantity: selectedDishes[dish.id.toString()] ? selectedDishes[dish.id.toString()].quantity : 0,
            dishId: dish.id,
            dish: dish
        })
        const [quantity, setQuantity] = useState()
        const onAdd = useCallback(() => {
            orderDish.quantity++
            if (orderDish.quantity === 1) {
                dispatch(addDish({...orderDish}))
            }
            setQuantity(orderDish.quantity)
        }, [orderDish])
        const onRemove = useCallback(() => {
            orderDish.quantity--
            if (orderDish.quantity === 0) {
                dispatch(removeDish({...orderDish}))
            }
            setQuantity(orderDish.quantity)
        }, [orderDish])
        return <DishListComponent dish={dish} onAdd={onAdd} quantity={orderDish.quantity} onRemove={onRemove}/>;
    }
)