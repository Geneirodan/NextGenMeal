import {withRole} from "../../../../hoc/withAuth";
import {useDispatch, useSelector} from "react-redux";
import {Container, Fab, Stack} from "@mui/material";
import React, {useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import {Preloader} from "../../../common/Preloader";
import {editDish, getDishes, selector, setUpdated} from "../../../../store/service/menu";
import {Paginator} from "../../../common/Paginator";
import {SearchComponent} from "../../../common/SearchComponent";
import AddIcon from '@mui/icons-material/Add';
import {TypeSelect} from "../../../common/TypeSelect";
import {DishListItem} from "../../../common/listItems/DishListItem";
import {DishEditDialog} from "../../../common/dialogs/DishEditDialog";

export const MenuPage = withRole("Service")(() => {
    const {cateringId} = useParams()
    const dishes = useSelector(selector("dishes"))
    const updated = useSelector(selector("updated"))
    const dispatch = useDispatch()
    const [filter, setFilter] = useState({cateringId})
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const onClick = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    useEffect(() => {
        setLoading(true)
        dispatch(getDishes(filter))
        updated && dispatch(setUpdated(false))
    }, [filter, updated])
    useEffect(() => setLoading(false), [dishes])
    const onSubmit = values => {
        console.log(values)
        dispatch(addDish(values))
        onClose()
    }
    return <Container>
        <Stack spacing={2}>
            <SearchComponent filter={filter} setFilter={setFilter}/>
            <TypeSelect filter={filter} setFilter={setFilter}/>
            <Paginator totalCount={dishes.totalCount} filter={filter} setFilter={setFilter}/>
            {loading ? <Preloader/> : dishes.items.map(dish => <DishListItem dish={dish}/>)}
            <Paginator totalCount={dishes.totalCount} filter={filter} setFilter={setFilter}/>
        </Stack>
        <DishEditDialog dish={{cateringId}} open={open} onClose={onClose} onSubmit={onSubmit}/>
        <Fab color="primary" sx={{position: 'absolute',bottom: 16,right: 16}} onClick={onClick}>
            <AddIcon/>
        </Fab>
    </Container>
})


