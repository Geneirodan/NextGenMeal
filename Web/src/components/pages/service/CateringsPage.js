import {withRole} from "../../../hoc/withAuth";
import {getCaterings, selectors} from "../../../store/service/caterings"
import {useDispatch, useSelector} from "react-redux";
import {Container, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Preloader} from "../../common/Preloader";
import {Paginator} from "../../common/Paginator";
import {SearchComponent} from "../../common/SearchComponent";
import {CateringListItem} from "../../common/listItems/CateringListItem";
import {selector} from "../../../store/service/caterings";

export const CateringsPage = withRole("Service")(() => {
    const caterings = useSelector(selector("caterings"))
    const dispatch = useDispatch()
    const [filter, setFilter] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        dispatch(getCaterings(filter))
    }, [filter])
    useEffect(() => {
        setLoading(false)
    }, [caterings])
    return <Container>
        <Stack spacing={2}>
            <SearchComponent filter={filter} setFilter={setFilter}/>
            {loading ? <Preloader/> : caterings.items.map(catering => <CateringListItem catering={catering}/>)}
            <Paginator totalCount={caterings.totalCount} filter={filter} setFilter={setFilter}/>
        </Stack>
    </Container>
})