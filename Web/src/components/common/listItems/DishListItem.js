import {Box, Card, Stack, Typography} from "@mui/material";
import React, {memo, useCallback} from "react";
import {deleteDish, editDish} from "../../../store/service/menu";
import {useMeasurements} from "../../../utils/hook/UseMeasurements";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {DishEditDialog} from "../dialogs/DishEditDialog";

export const DishListItem = memo(
    ({dish}) => {

        const {m} = useMeasurements()
        const {unit, toCI} = useMeasurements()
        const convertValues = useCallback(
            values => ({
                    ...values,
                    portion: toCI(values.portion, unit)
                }),
            [unit, toCI])
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
                <EditDialogButton EditDialog={DishEditDialog}
                                  editAction={editDish}
                                  dish={dish}
                                  convertValues={convertValues}/>
                <DeleteButton deleteAction={deleteDish} id={dish.id}/>
            </Stack>
        </Card>
    }
)