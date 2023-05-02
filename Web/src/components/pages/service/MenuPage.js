import {withRole} from "../../../utils/hoc/withAuth";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addDish, getDishes, selector, setUpdated} from "../../../store/service/menu";
import {SearchComponent} from "../../common/SearchComponent";
import {TypeSelect} from "../../common/TypeSelect";
import {DishListItem} from "../../common/listItems/DishListItem";
import {DishEditDialog} from "../../common/dialogs/DishEditDialog";
import {ListContainer} from "../../common/ListContainer";
import {useTranslation} from "react-i18next";

export const MenuPage = withRole("Service")(() => {
    const {t} = useTranslation();
    const {cateringId} = useParams()
    const {items, totalCount} = useSelector(selector("dishes"))
    const updated = useSelector(selector("updated"))
    const dispatch = useDispatch()
    const [filter, setFilter] = useState({cateringId})
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const onClick = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const itemCallback = useCallback(dish => <DishListItem dish={dish}/>, [])
    const onSubmit = values => {
        console.info(values)
        dispatch(addDish(values))
        onClose()
    }
    const editDialog = <DishEditDialog dish={{cateringId}} open={open} onClose={onClose} onSubmit={onSubmit}/>
    const typeSelect = <TypeSelect filter={filter} setFilter={setFilter}/>
    const searchComponent = <SearchComponent filter={filter} setFilter={setFilter}/>
    useEffect(() => {
        setLoading(true)
        dispatch(getDishes(filter))
        updated && dispatch(setUpdated(false))
    }, [filter, updated])
    useEffect(() => setLoading(false), [items])
    return <ListContainer filter={filter}
                          filters={[searchComponent, typeSelect]}
                          setFilter={setFilter}
                          items={items}
                          loading={loading}
                          itemCallback={itemCallback}
                          totalCount={totalCount}
                          onClick={onClick}
                          editDialog={editDialog}
                          emptyLabel={t("No dishes found")}/>
})