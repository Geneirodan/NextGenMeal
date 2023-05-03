import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getDishes, selector as dishSelector} from "../../../../store/service/menu";
import React, {useCallback, useEffect, useState} from "react";
import {DishListButton} from "../../../common/listItems/DishListButton";
import {SearchComponent} from "../../../common/SearchComponent";
import {TypeSelect} from "../../../common/TypeSelect";
import {ListContainer} from "../../../common/ListContainer";

export const Step3 = ({formik}) => {
    const {t} = useTranslation();
    const {items, totalCount} = useSelector(dishSelector("dishes"))
    const [filter, setFilter] = useState({cateringId: formik.values.cateringId})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const itemCallback = useCallback(dish => <DishListButton dish={dish} formik={formik}/>, [])
    const searchComponent = <SearchComponent filter={filter} setFilter={setFilter}/>
    const typeSelect = <TypeSelect filter={filter} setFilter={setFilter}/>
    useEffect(() => {
        setLoading(true)
        dispatch(getDishes(filter))
    }, [filter])
    useEffect(() => setLoading(false), [items])
    return <>
        <ListContainer filter={filter}
                       filters={[searchComponent, typeSelect]}
                       setFilter={setFilter}
                       items={items}
                       loading={loading}
                       itemCallback={itemCallback}
                       totalCount={totalCount}
                       emptyLabel={t("No dishes found")}/>
    </>
}