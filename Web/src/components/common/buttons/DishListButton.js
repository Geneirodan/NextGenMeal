import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
import React, {memo, useCallback, useEffect, useState} from "react";
import {useMeasurements} from "../../../utils/hook/UseMeasurements";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {addDish, removeDish, selector} from "../../../store/customer/new_order";
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
                {
                    readonly ||
                    <IconButton onClick={onAdd}>
                        <AddIcon/>
                    </IconButton>
                }
                {
                    quantity &&
                    <>
                        <Typography>
                            {quantity}
                        </Typography>
                        {
                            readonly ||
                            <IconButton onClick={onRemove}>
                                <RemoveIcon/>
                            </IconButton>
                        }
                    </>
                }
            </Stack>
        </Card>
    }
)

export const DishListButton = memo(
    ({dish}) => {
        const dispatch = useDispatch()
        const selectedDishes = useSelector(selector("selectedDishes"))
        const [quantity, setQuantity] = useState(selectedDishes[dish.id.toString()]?.quantity ?? 0)
        const onAdd = useCallback(
            () => setQuantity(prevState => prevState + 1),
            [setQuantity]
        )
        const onRemove = useCallback(
            () => setQuantity(prevState => prevState - 1),
            [setQuantity]
        )
        useEffect(
            () => {
                const action = quantity ? addDish : removeDish
                const orderDish = {dishId: dish.id, dish, quantity};
                dispatch(action(orderDish))
            },
            [quantity]
        )
        return <DishListComponent dish={dish} onAdd={onAdd} quantity={quantity} onRemove={onRemove}/>;
    }
)