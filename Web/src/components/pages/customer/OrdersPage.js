import {withRole} from "../../../utils/hoc/withAuth";
import {getOrders, selector, setUpdated} from "../../../store/customer/orders";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {SearchComponent} from "../../common/inputs/SearchComponent";
import {ListContainer} from "../../common/ListContainer";
import {useTranslation} from "react-i18next";
import {useUpdate} from "../../../utils/hook/hooks";
import {OrderListItem} from "../../common/listItems/OrderListItem";

export const OrdersPage = withRole("Customer")(() => {
    const {t} = useTranslation()
    const {items, totalCount} = useSelector(selector("orders"))
    const dispatch = useDispatch()
    const updated = useUpdate(selector)
    const [filter, setFilter] = useState({})
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
    return <ListContainer filter={filter}
                          setFilter={setFilter}
                          filters={[
                              <SearchComponent filter={filter} setFilter={setFilter}/>
                          ]}
                          items={items}
                          loading={loading}
                          itemCallback={itemCallback}
                          totalCount={totalCount}/>
})