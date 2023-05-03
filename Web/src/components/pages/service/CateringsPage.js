import {withRole} from "../../../utils/hoc/withAuth";
import {addCatering, getCaterings, selector} from "../../../store/service/caterings"
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {SearchComponent} from "../../common/SearchComponent";
import {CateringListItem} from "../../common/listItems/CateringListItem";
import {ListContainer} from "../../common/ListContainer";
import {addDish, setUpdated} from "../../../store/service/caterings";
import {CateringEditDialog} from "../../common/dialogs/CateringEditDialog";
import {Fab, Link} from "@mui/material";
import {useTranslation} from "react-i18next";
import AddIcon from "@mui/icons-material/Add";

export const CateringsPage = withRole("Service")(() => {
    const {t} = useTranslation()
    const {items, totalCount} = useSelector(selector("caterings"))
    const updated = useSelector(selector("updated"))
    const dispatch = useDispatch()
    const [filter, setFilter] = useState({})
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const onClick = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    const itemCallback = useCallback(catering => <CateringListItem catering={catering}/>, [])
    const onSubmit = values => {
        dispatch(addCatering(values))
        onClose()
    }
    const searchComponent = <SearchComponent filter={filter} setFilter={setFilter}/>
    useEffect(() => {
        setLoading(true)
        dispatch(getCaterings(filter))
        updated && dispatch(setUpdated(false))
    }, [filter, updated])
    useEffect(() => setLoading(false), [items])
    return <>
        <ListContainer filter={filter}
                          setFilter={setFilter}
                          filters={[searchComponent]}
                          items={items}
                          loading={loading}
                          itemCallback={itemCallback}
                          totalCount={totalCount}/>
        <CateringEditDialog catering={{}} open={open} onClose={onClose} onSubmit={onSubmit}/>
        <Fab color="primary" sx={{position: "absolute", bottom: 16, right: 16}} onClick={onClick}>
            <AddIcon/>
        </Fab>
    </>
})