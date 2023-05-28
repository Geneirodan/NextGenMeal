import {Box, Card, Chip, IconButton, Stack} from "@mui/material";
import React, {memo, useCallback, useEffect, useState} from "react";
import {useMeasurements} from "../../../utils/hook/UseMeasurements";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {addDish, removeDish, selector} from "../../../store/customer/new_order";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

export const DishListComponent = memo(
    ({dish, onAdd, onRemove, quantity, readonly = false}) => {
        const {t} = useTranslation()
        const {m} = useMeasurements()
        return <Card sx={{padding: 1}}>
            <Stack direction="row" alignItems="center">
                <Box sx={{flexGrow: 1}}>
                    {t("Name")}: {dish.name}<br/>
                    {t("Price")}: {`$${dish.price}`}<br/>
                    {t("Portion")}: {m(dish.portion)}<br/>
                    {t("Type")}: {dish.type}<br/>
                    {dish.description}
                < /Box>
                {
                    readonly ||
                    <IconButton onClick={onAdd}>
                        <AddIcon/>
                    </IconButton>
                }
                {
                    quantity &&
                    <>
                        <Chip label={quantity}/>
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
    ({
         dish
     }) => {
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