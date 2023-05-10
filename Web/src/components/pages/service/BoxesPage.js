import {withRole} from "../../../utils/hoc/withAuth";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState, memo} from "react";
import {useParams} from "react-router-dom";
import {addBox, getBoxes, selector, setUpdated} from "../../../store/service/boxes";
import {SearchComponent} from "../../common/inputs/SearchComponent";
import {BoxListItem} from "../../common/listItems/BoxListItem";
import {BoxEditDialog} from "../../common/dialogs/BoxEditDialog";
import {ListContainer} from "../../common/ListContainer";
import {useTranslation} from "react-i18next";
import {AddFab} from "../../common/buttons/AddFab";
import {EditDialogButton} from "../../common/dialogs/EditDialogButton";

export const BoxesPage = memo(
    withRole("Service")(
        () => {
            const {t} = useTranslation()
            const {terminalId} = useParams()
            const {items, totalCount} = useSelector(selector("boxes"))
            const updated = useSelector(selector("updated"))
            const dispatch = useDispatch()
            const [filter, setFilter] = useState({terminalId})
            const [loading, setLoading] = useState(false)
            const itemCallback = useCallback(
                box => <BoxListItem key={box.id} box={box}/>,
                []
            )
            useEffect(
                () => {
                    setLoading(true)
                    dispatch(getBoxes(filter))
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
                               filters={<SearchComponent filter={filter} setFilter={setFilter}/>}
                               setFilter={setFilter}
                               items={items}
                               loading={loading}
                               itemCallback={itemCallback}
                               totalCount={totalCount}
                               emptyLabel={t("No boxes found")}/>
                <EditDialogButton EditDialog={BoxEditDialog} EditButton={AddFab} editAction={addBox}
                                  box={{terminalId}}/>
            </>
        }
    )
)