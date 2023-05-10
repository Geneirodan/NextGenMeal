import React, {memo, useCallback, useEffect, useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import {useOpen} from "../../../utils/hook/hooks";
import {useMeasurements} from "../../../utils/hook/UseMeasurements";
import {getBoxes, selector, setUpdated} from "../../../store/service/boxes";
import {BoxListItem} from "../listItems/BoxListItem";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {SearchComponent} from "../inputs/SearchComponent";
import {ListContainer} from "../ListContainer";

export const BoxesDialog = memo(
    ({formik}) => {
        const {t, i18n} = useTranslation()
        const {items, totalCount} = useSelector(selector("boxes"))
        const [open, onClick, onClose] = useOpen()
        const {getUnitSymbol, unit, setUnit} = useMeasurements()
        const onChange = useCallback(
            (event, measure) => setUnit(measure.props.value),
            []
        )
        const updated = useSelector(selector("updated"))
        const dispatch = useDispatch()
        const [filter, setFilter] = useState({terminalId: formik.values.cateringId})
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
            <Button onClick={onClick}>
                {t("Choose box")}
            </Button>
            <Dialog open={open} keepMounted onClose={onClose}>
                <DialogTitle>{t("Settings")}</DialogTitle>
                <DialogContent>
                    <ListContainer filter={filter}
                                   filters={<SearchComponent filter={filter} setFilter={setFilter}/>}
                                   setFilter={setFilter}
                                   items={items}
                                   loading={loading}
                                   itemCallback={itemCallback}
                                   totalCount={totalCount}
                                   emptyLabel={t("No boxes found")}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        {t("Close")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    }
)