import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getServices, selector} from "../../../../store/customer/order";
import React, {useCallback, useEffect, useState} from "react";
import {ServiceListButton} from "../../../common/listItems/ServiceListButton";
import {SearchComponent} from "../../../common/SearchComponent";
import {ListContainer} from "../../../common/ListContainer";

export const Step1 = ({nextStep, formik}) => {
    const {t} = useTranslation();
    const {items, totalCount} = useSelector(selector("services"))
    const [filter, setFilter] = useState({})
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const onClick = useCallback((catering) => () => {
        formik.setFieldValue("serviceId", catering.id)
        nextStep();
    }, [nextStep, formik])
    const itemCallback = useCallback(service => <ServiceListButton service={service}
                                                                   onClick={onClick(service)}/>, [onClick])
    const searchComponent = <SearchComponent filter={filter} setFilter={setFilter}/>
    useEffect(() => {
        setLoading(true)
        dispatch(getServices(filter))
    }, [filter])
    useEffect(() => setLoading(false), [items])
    return <ListContainer filter={filter}
                          filters={[searchComponent]}
                          setFilter={setFilter}
                          items={items}
                          loading={loading}
                          itemCallback={itemCallback}
                          totalCount={totalCount}
                          emptyLabel={t("No services found")}/>
}