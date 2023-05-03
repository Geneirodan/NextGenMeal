import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getCaterings, selectedDishesSuccess, selector} from "../../../../store/customer/order";
import React, {useCallback, useEffect, useState} from "react";
import {CateringListButton} from "../../../common/listItems/CateringListButton";
import {SearchComponent} from "../../../common/SearchComponent";
import {ListContainer} from "../../../common/ListContainer";

export const Step2 = ({nextStep, formik}) => {
    const {t} = useTranslation();
    const {items, totalCount} = useSelector(selector("caterings"))
    const [filter, setFilter] = useState({serviceId: formik.values.serviceId})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const onClick = useCallback((catering) => () => {
        formik.setFieldValue("cateringId", catering.id)
        nextStep();
    }, [nextStep, formik])
    const itemCallback = useCallback(catering => <CateringListButton catering={catering}
                                                                     onClick={onClick(catering)}/>, [])
    const searchComponent = <SearchComponent filter={filter} setFilter={setFilter}/>
    useEffect(() => {
        setLoading(true)
        dispatch(getCaterings(filter))
    }, [filter])
    useEffect(() => setLoading(false), [items])
    useEffect(() => () => dispatch(selectedDishesSuccess([])), [])
    return <ListContainer filter={filter}
                          filters={[searchComponent]}
                          setFilter={setFilter}
                          items={items}
                          loading={loading}
                          itemCallback={itemCallback}
                          totalCount={totalCount}
                          emptyLabel={t("No caterings found")}/>
}