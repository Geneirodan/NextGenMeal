import {withRole} from "../../../../hoc/withAuth";
import {useDispatch, useSelector} from "react-redux";
import {Container, Fab, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Preloader} from "../../../common/Preloader";
import {getDishes, selectors} from "../../../../store/service/menu";
import {Paginator} from "../../../common/Paginator";
import {SearchComponent} from "../../../common/SearchComponent";
import AddIcon from '@mui/icons-material/Add';
import {TypeSelect} from "../../../common/TypeSelect";
import {DishListItem} from "../../../common/listItems/DishListItem";

export const BoxesPage = withRole("Service")(() => {
    const {cateringId} = useParams()
    //const boxes = useSelector(selectors.boxes)
    const dispatch = useDispatch()
    const [filter, setFilter] = useState({cateringId})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        console.info(filter)
        setLoading(true)
        dispatch(getDishes(filter))
    }, [filter])
    useEffect(() => {
        setLoading(false)
    }, [dishes])
    return <Container>
        <Stack spacing={2}>
            <SearchComponent filter={filter} setFilter={setFilter}/>
            <TypeSelect filter={filter} setFilter={setFilter}/>
            {loading ? <Preloader/> : dishes.items.map(catering => <DishListItem dish={catering}/>)}
            <Paginator totalCount={dishes.totalCount} filter={filter} setFilter={setFilter}/>
        </Stack>
        <Fab size="small" color="secondary" aria-label="add">
            <AddIcon/>
        </Fab>
    </Container>
})

