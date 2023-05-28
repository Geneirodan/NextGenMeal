import {withRole} from "../../../utils/hoc/withAuth";
import {getOrders, selector, setUpdated} from "../../../store/customer/orders";
import {useDispatch, useSelector} from "react-redux";
import React, {memo, useCallback, useEffect, useState} from "react";
import {ListContainer} from "../../common/ListContainer";
import {useTranslation} from "react-i18next";
import {useUpdate} from "../../../utils/hook/hooks";
import {OrderListItem} from "../../common/listItems/OrderListItem";
import {roles} from "../../../utils/constants";
import {AddFab} from "../../common/buttons/AddFab";
import {useNavigate} from "react-router-dom";
import {PeriodPicker} from "../../common/inputs/PeriodPicker";

export const OrdersPage = memo(
    withRole(roles.Employee)(
        () => {
            const {t} = useTranslation()
            const {items, totalCount} = useSelector(selector("orders"))
            const dispatch = useDispatch()
            const navigate = useNavigate()
            const [filter, setFilter] = useState({})
            const updated = useUpdate(selector, setUpdated)
            const [loading, setLoading] = useState(false)
            const itemCallback = useCallback(
                order => <OrderListItem key={order.id} order={order}/>,
                []
            )
            useEffect(
                () => {
                    setLoading(true)
                    dispatch(getOrders(filter))
                    updated && dispatch(setUpdated(false))
                },
                [filter, updated]
            )
            useEffect(
                () => setLoading(false),
                [items]
            )
            const onClick = useCallback(
                () => navigate("/orders/new"),
                [navigate]
            )
            return <>
                <ListContainer filter={filter}
                               setFilter={setFilter}
                               filters={<PeriodPicker filter={filter} setFilter={setFilter}/>}
                               items={items}
                               loading={loading}
                               itemCallback={itemCallback}
                               totalCount={totalCount}/>
                <AddFab onClick={onClick}/>
            </>
        }
    )
)