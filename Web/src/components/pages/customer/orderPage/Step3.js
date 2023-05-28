import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getDishes, selector as dishSelector} from "../../../../store/service/menu";
import React, {memo, useCallback, useEffect, useState} from "react";
import {DishListButton} from "../../../common/buttons/DishListButton";
import {SearchComponent} from "../../../common/inputs/SearchComponent";
import {TypeSelect} from "../../../common/inputs/TypeSelect";
import {ListContainer} from "../../../common/ListContainer";
import {bottomFabStyle, leftFabStyle, rightFabStyle} from "../../../common/buttons/AddFab";
import {Button, Stack} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import {getOptimalDishes} from "../../../../store/customer/new_order";
import {OptimalDialog} from "../../../common/dialogs/OptimalDialog";
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import StarIcon from "@mui/icons-material/Star";
import {useOpen} from "../../../../utils/hook/hooks";


export const Step3 = memo(
    ({formik, nextStep, backStep}) => {
        const {t} = useTranslation();
        const {items, totalCount} = useSelector(dishSelector("dishes"))
        const [filter, setFilter] = useState({cateringId: formik.values.cateringId})
        const [loading, setLoading] = useState(false)
        const dispatch = useDispatch()
        const [open, onClick, onClose] = useOpen();
        const itemCallback = useCallback(
            dish => <DishListButton key={dish.id} dish={dish} formik={formik}/>,
            [formik]
        )
        useEffect(
            () => {
                setLoading(true)
                dispatch(getDishes(filter))
            },
            [filter]
        )
        useEffect(
            () => setLoading(false),
            [items]
        )
        const onSubmitOptimal = useCallback(
            async values => {
                const ok = await dispatch(getOptimalDishes(values))
                if (ok) {
                    nextStep()
                    onClose()
                }
            },
            [formik, nextStep, onClose, dispatch]
        )
        const [disableNext, setDisableNext] = useState(true)
        useEffect(
            () => setDisableNext(!formik.values.orderDishes.length),
            [formik]
        )
        return <>
            <ListContainer filter={filter}
                           filters={[
                               <SearchComponent filter={filter} setFilter={setFilter}/>,
                               <TypeSelect filter={filter} setFilter={setFilter}/>
                           ]}
                           setFilter={setFilter}
                           items={items}
                           loading={loading}
                           itemCallback={itemCallback}
                           totalCount={totalCount}
                           emptyLabel={t("No dishes found")}/>
            <OptimalDialog cateringId={formik.values.cateringId}
                           open={open}
                           onClose={onClose}
                           onSubmit={onSubmitOptimal}/>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={bottomFabStyle} alignItems="end">
                <Button variant="contained" onClick={backStep} sx={leftFabStyle}>
                    <KeyboardArrowLeft/> {t("Back")}
                </Button>
                <Stack justifyContent="space-between" spacing={2} alignItems="stretch" sx={rightFabStyle}>
                    <Button variant="contained" onClick={onClick}>
                        <StarIcon/> {t("Try optimal")}
                    </Button>
                    <Button variant="contained" onClick={nextStep} disabled={disableNext}>
                        {t("Next")} <KeyboardArrowRight/>
                    </Button>
                </Stack>
            </Stack>
        </>
    }
)