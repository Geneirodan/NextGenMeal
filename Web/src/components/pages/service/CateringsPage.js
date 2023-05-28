import {withRole} from "../../../utils/hoc/withAuth";
import {addCatering, getCaterings, selector, setUpdated} from "../../../store/service/caterings"
import {useDispatch, useSelector} from "react-redux";
import React, {memo, useCallback, useEffect, useState} from "react";
import {SearchComponent} from "../../common/inputs/SearchComponent";
import {CateringListItem} from "../../common/listItems/CateringListItem";
import {ListContainer} from "../../common/ListContainer";
import {CateringEditDialog} from "../../common/dialogs/CateringEditDialog";
import {useUpdate} from "../../../utils/hook/hooks";
import {AddFab} from "../../common/buttons/AddFab";
import {EditDialogButton} from "../../common/dialogs/EditDialogButton";
import {roles} from "../../../utils/constants";

export const CateringsPage = memo(
    withRole(roles.Service)(
        () => {
            const {items, totalCount} = useSelector(selector("caterings"))
            const updated = useUpdate(selector, setUpdated)
            const dispatch = useDispatch()
            const [filter, setFilter] = useState({})
            const [loading, setLoading] = useState(false)
            const itemCallback = useCallback(
                catering => <CateringListItem key={catering.id} catering={catering}/>,
                []
            )
            useEffect(
                () => {
                    setLoading(true)
                    dispatch(getCaterings(filter))
                    updated && dispatch(setUpdated(false))
                },
                [filter, updated]
            )
            useEffect(
                () => setLoading(false),
                [items]
            )
            return <>
                <ListContainer filter={filter}
                               setFilter={setFilter}
                               filters={<SearchComponent filter={filter} setFilter={setFilter}/>}
                               items={items}
                               loading={loading}
                               itemCallback={itemCallback}
                               totalCount={totalCount}/>
                <EditDialogButton EditDialog={CateringEditDialog} EditButton={AddFab} editAction={addCatering}
                                  catering={{}}/>
            </>
        }
    )
)