import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getDishes, selector as dishSelector} from "../../../../store/service/menu";
import React, {memo, useCallback, useEffect, useState} from "react";
import {DishListButton} from "../../../common/buttons/DishListButton";
import {SearchComponent} from "../../../common/inputs/SearchComponent";
import {TypeSelect} from "../../../common/inputs/TypeSelect";
import {ListContainer} from "../../../common/ListContainer";

export const Step3 = memo(
    ({formik}) => {
        const {t} = useTranslation();
        const {items, totalCount} = useSelector(dishSelector("dishes"))
        const [filter, setFilter] = useState({cateringId: formik.values.cateringId})
        const [loading, setLoading] = useState(false)
        const dispatch = useDispatch()
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
        return <ListContainer filter={filter}
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
    }
)