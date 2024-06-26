import {withRole} from "../../../utils/hoc/withRole";
import React, {memo, useCallback, useEffect, useState} from "react";
import {Alert, Box, Card, Fab, Snackbar, Stack, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import 'dayjs/locale/uk'
import 'dayjs/locale/en'
import {useDispatch, useSelector} from "react-redux";
import {addOrder, selector} from "../../../store/order";
import * as yup from "yup";
import {useUpdate} from "../../../utils/hook/hooks";
import {ErrorsSnackbar} from "../../common/ErrorsSnackbar";
import {useNavigate} from "react-router-dom";
import {roles} from "../../../utils/constants";
import {getDishes, selector as dishSelector} from "../../../store/menu";
import {DishListButton} from "../../common/buttons/DishListButton";
import {ListContainer} from "../../common/ListContainer";
import {SearchComponent} from "../../common/inputs/SearchComponent";
import {TypeSelect} from "../../common/inputs/TypeSelect";
import {selector as authSelector} from "../../../store/auth"
import dayjs from "dayjs/esm";
import {rightFabStyle} from "../../common/buttons/AddFab";
import {setUpdated} from "../../../store/common";

const SuccessSnackbar = memo(
    ({open}) => {
        const {t} = useTranslation()
        const navigate = useNavigate()
        const onClose = useCallback(
            () => navigate("/orders"),
            [navigate]
        )
        return (
            <Snackbar open={open}
                      autoHideDuration={6000}
                      onClose={onClose}
                      anchorOrigin={{vertical: "bottom", horizontal: "right"}}>
                <Alert onClose={onClose} severity="success">
                    {t("Successfully created")}
                </Alert>
            </Snackbar>
        )
    }
)

export const OrderPage = memo(
    withRole(roles.Employee)(
        () => {
            const {t} = useTranslation()
            const dispatch = useDispatch()

            const info = useSelector(authSelector('info'))
            const [filter, setFilter] = useState({cateringId: info.cateringId})
            const [loading, setLoading] = useState(false)

            const {items, totalCount} = useSelector(dishSelector("dishes"))
            const orderDishes = useSelector(selector("selectedDishes"))
            const updated = useUpdate()


            useEffect(
                () => {
                    formik.setValues({
                        ...formik.values,
                        orderDishes: Object.values(orderDishes).filter(x => x !== undefined)
                    })
                },
                [orderDishes]
            )

            const initialValues = {
                isBox: false,
                cateringId: 0,
                orderDishes: []
            }
            const validationSchema = yup.object({
                orderDishes: yup.array().required(t('Required')).min(1, t('Required'))
            });
            const onSubmit = useCallback(
                values => {
                    values.time = dayjs(Date.now()).toString()
                    console.info(values)
                    dispatch(addOrder(values))
                },
                [dispatch]
            )
            const formik = useFormik({initialValues, validationSchema, onSubmit})

            useEffect(
                () =>
                    () => {
                        dispatch(setUpdated(false))
                    },
                []
            )
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
            const reduceCallback = useCallback(
                (s, x) => s + x.dish.price * x.quantity,
                []
            )
            return (
                <form onSubmit={formik.handleSubmit} style={{height: "100%"}}>
                    <Stack sx={{width: '100%', height: '100%'}} spacing={2}>
                        <Box flexGrow="1">
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
                        </Box>
                        <Stack direction={"row"} justifyContent="space-between" spacing={2} sx={rightFabStyle} color="primary"
                               alignItems="stretch" p={2}>
                            <Card sx={{padding: 1}}>
                                <Typography>
                                    {t("Your price")}: ${formik.values.orderDishes.reduce(reduceCallback, 0)}
                                </Typography>
                            </Card>
                            <Fab variant="extended" type="submit" color="primary">
                                {t("Finish")}
                            </Fab>
                        </Stack>
                        <ErrorsSnackbar/>
                        <SuccessSnackbar open={updated}/>
                    </Stack>
                </form>
            )
        }
    )
)