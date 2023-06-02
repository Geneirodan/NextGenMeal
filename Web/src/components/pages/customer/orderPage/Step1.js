import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getServices, selector} from "../../../../store/order";
import React, {memo, useCallback, useEffect, useState} from "react";
import {ServiceListButton} from "../../../common/buttons/ServiceListButton";
import {SearchComponent} from "../../../common/inputs/SearchComponent";
import {ListContainer} from "../../../common/ListContainer";

export const Step1 = memo(
    ({nextStep, formik}) => {
        const {t} = useTranslation();
        const {items, totalCount} = useSelector(selector("services"))
        const [filter, setFilter] = useState({})
        const [loading, setLoading] = useState(false)
        const dispatch = useDispatch()
        const onClick = useCallback(
            service =>
                () => {
                    formik.setFieldValue("serviceId", service.id)
                    nextStep();
                },
            [nextStep, formik]
        )
        const itemCallback = useCallback(
            service => <ServiceListButton key={service.id} service={service} onClick={onClick(service)}/>,
            [onClick]
        )
        useEffect(
            () => {
                setLoading(true)
                dispatch(getServices(filter))
            },
            [filter]
        )
        useEffect(
            () => setLoading(false),
            [items]
        )
        return <ListContainer filter={filter}
                              filters={[
                                  <SearchComponent filter={filter} setFilter={setFilter}/>
                              ]}
                              setFilter={setFilter}
                              items={items}
                              loading={loading}
                              itemCallback={itemCallback}
                              totalCount={totalCount}
                              emptyLabel={t("No services found")}/>
    }
)