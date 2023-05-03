import {withRole} from "../../../utils/hoc/withAuth";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addBox, getBoxes, selector, setUpdated} from "../../../store/service/boxes";
import {SearchComponent} from "../../common/SearchComponent";
import {BoxListItem} from "../../common/listItems/BoxListItem";
import {BoxEditDialog} from "../../common/dialogs/BoxEditDialog";
import {ListContainer} from "../../common/ListContainer";
import {Fab, Link} from "@mui/material";
import {useTranslation} from "react-i18next";
import {CateringEditDialog} from "../../common/dialogs/CateringEditDialog";
import AddIcon from "@mui/icons-material/Add";

export const BoxesPage = withRole("Service")(() => {
    const {t} = useTranslation()
    const {terminalId} = useParams()
    const {items, totalCount} = useSelector(selector("boxes"))
    const updated = useSelector(selector("updated"))
    const dispatch = useDispatch()
    const [filter, setFilter] = useState({terminalId})
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const onClick = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const itemCallback = useCallback(box => <BoxListItem box={box}/>, [])
    const onSubmit = values => {
        dispatch(addBox(values))
        onClose()
    }
    const searchComponent = <SearchComponent filter={filter} setFilter={setFilter}/>
    useEffect(() => {
        setLoading(true)
        dispatch(getBoxes(filter))
        updated && dispatch(setUpdated(false))
    }, [filter, updated])
    useEffect(() => setLoading(false), [items])
    return <>
        <ListContainer filter={filter}
                          filters={[searchComponent]}
                          setFilter={setFilter}
                          items={items}
                          loading={loading}
                          itemCallback={itemCallback}
                          totalCount={totalCount}
                          onClick={onClick}
                          editDialog={editDialog}
                          emptyLabel={t("No boxes found")}/>
        <BoxEditDialog box={{terminalId}} open={open} onClose={onClose} onSubmit={onSubmit}/>
        <Fab color="primary" sx={{position: "absolute", bottom: 16, right: 16}} onClick={onClick}>
            <AddIcon/>
        </Fab>
    </>
})