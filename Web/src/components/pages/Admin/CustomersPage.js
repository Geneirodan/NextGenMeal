import {withRole} from "../../../utils/hoc/withAuth";
import {useDispatch, useSelector} from "react-redux";
import React, {memo, useCallback, useEffect, useState} from "react";
import {SearchComponent} from "../../common/inputs/SearchComponent";
import {ListContainer} from "../../common/ListContainer";
import {useUpdate} from "../../../utils/hook/hooks";
import {roles} from "../../../utils/constants";
import {UserListItem} from "../../common/listItems/UserListItem";
import {getCustomers, selector, setUpdated} from "../../../store/admin";

export const CustomersPage = memo(
    withRole(roles.Admin)(
        ({getter}) => {
            const {items, totalCount} = useSelector(selector("users"))
            const updated = useUpdate(selector, setUpdated)
            const dispatch = useDispatch()
            const [filter, setFilter] = useState({})
            const [loading, setLoading] = useState(false)
            console.log(items)
            const itemCallback = useCallback(
                item => <UserListItem key={item.user.id} user={item.user} isLocked={item.isLocked}/>,
                []
            )
            useEffect(
                () => {
                    setLoading(true)
                    dispatch(getter(filter))
                    updated && dispatch(setUpdated(false))
                },
                [filter, updated, getter]
            )
            useEffect(
                () => setLoading(false),
                [items]
            )
            return <ListContainer filter={filter}
                                  setFilter={setFilter}
                                  filters={<SearchComponent filter={filter} setFilter={setFilter}/>}
                                  items={items}
                                  loading={loading}
                                  itemCallback={itemCallback}
                                  totalCount={totalCount}/>
        }
    )
)