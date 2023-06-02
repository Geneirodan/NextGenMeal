import {Box, Card, Stack} from "@mui/material";
import React, {memo, useCallback} from "react";
import {deleteDish, editDish} from "../../../store/menu";
import {useMeasurements} from "../../../utils/hook/UseMeasurements";
import {EditDialogButton} from "../dialogs/EditDialogButton";
import {DeleteButton} from "../buttons/DeleteButton";
import {DishEditDialog} from "../dialogs/DishEditDialog";
import {useTranslation} from "react-i18next";

export const DishListItem = memo(
    ({dish}) => {
        const {t} = useTranslation()
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
                    {t("Name")}: {dish.name}<br/>
                    {t("Price")}: {`$${dish.price}`}<br/>
                    {t("Portion")}: {m(dish.portion)}<br/>
                    {t("Type")}: {(dish.type)}<br/>
                    {dish.description}
                < /Box>
                <EditDialogButton EditDialog={DishEditDialog}
                                  editAction={editDish}
                                  dish={dish}
                                  convertValues={convertValues}/>
                <DeleteButton deleteAction={deleteDish} id={dish.id}/>
            </Stack>
        </Card>
    }
)