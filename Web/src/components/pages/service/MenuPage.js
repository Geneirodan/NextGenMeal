import {withRole} from "../../../utils/hoc/withRole";
import {useDispatch, useSelector} from "react-redux";
import React, {memo, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addDish, getDishes, selector} from "../../../store/menu";
import {SearchComponent} from "../../common/inputs/SearchComponent";
import {TypeSelect} from "../../common/inputs/TypeSelect";
import {DishListItem} from "../../common/listItems/DishListItem";
import {DishEditDialog} from "../../common/dialogs/DishEditDialog";
import {ListContainer} from "../../common/ListContainer";
import {useTranslation} from "react-i18next";
import {AddFab} from "../../common/buttons/AddFab";
import {EditDialogButton} from "../../common/dialogs/EditDialogButton";
import {useUpdate} from "../../../utils/hook/hooks";
import {roles} from "../../../utils/constants";
import {Stack} from "@mui/material";
import {setUpdated} from "../../../store/common";

export const MenuPage = memo(
    withRole(roles.Service)(
        () => {
            const {t} = useTranslation();
            const {cateringId} = useParams()
            const {items, totalCount} = useSelector(selector("dishes"))
            const updated = useUpdate()
            const dispatch = useDispatch()
            const [filter, setFilter] = useState({cateringId})
            const [loading, setLoading] = useState(false)
            const itemCallback = useCallback(
                dish => <DishListItem key={dish.id} dish={dish}/>,
                []
            )
            useEffect(
                () => {
                    setLoading(true)
                    dispatch(getDishes(filter))
                    updated && dispatch(setUpdated(false))
                },
                [filter, updated]
            )
            useEffect(
                () => setLoading(false),
                [items]
            )
            return <Stack>
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
                <EditDialogButton EditDialog={DishEditDialog} EditButton={AddFab} editAction={addDish}
                                  dish={{cateringId}}/>
            </Stack>;
        }
    )
)