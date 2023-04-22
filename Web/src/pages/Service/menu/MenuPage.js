import {withRole} from "../../../hoc/withAuth";
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Typography
} from "@mui/material";
import {CustomTextField} from "../../../components/common/TextFields";
import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {useNavigate} from "react-router-dom";
import {ArrayParam, useQueryParam} from "use-query-params";
import {Preloader} from "../../../components/common/Preloader";
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import selectors from "../../../store/service/selectors";
import {getDishes} from "../../../store/service/thunks";
import {Paginator} from "../../../components/common/Paginator";
import {SearchComponent} from "../../../components/common/SearchComponent";

const DishEditDialog = ({dish, open, onClose}) => {
    const types = useSelector(selectors.types)
    const {t} = useTranslation()
    const onSubmit = values => {
        console.log(values)
    }
    const formik = useFormik({initialValues: dish, onSubmit})
    return <Dialog open={open} keepMounted onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <DialogTitle>{t("Edit dish")}</DialogTitle>
                <Stack spacing={2}>
                    <CustomTextField name="name" formik={formik} label={t("Name")}/>
                    <CustomTextField name="price" type="number" formik={formik} label={t("Street")}/>
                    <CustomTextField name="portion" type="number" formik={formik} label={t("City")}/>
                    <CustomTextField name="description" formik={formik} label={t("State")}/>
                    <Select name="type" label={t("Type")}>
                        {types.map(type => <MenuItem value={type}>{t(type)}</MenuItem>)}
                    </Select>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Revert</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </form>
    </Dialog>;
};

const DishListComponent = ({catering}) => {
    const [editMode, setEditMode] = useState(false)
    const navigate = useNavigate()
    return <Card sx={{padding: 1}}>
        <Stack direction="row">
            <Box sx={{flexGrow: 1}}>
                <Typography>
                    {catering.name}
                </Typography>
                <Typography>
                    {`${(catering.city)}, ${(catering.state)}, ${(catering.street)}`}
                </Typography>
            </Box>
            <DishEditDialog catering={catering} open={editMode} onClose={() => setEditMode(false)}/>
            <IconButton onClick={() => setEditMode(true)}>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={() => navigate(`${catering.id}/menu`)}>
                <RestaurantMenuIcon/>
            </IconButton>
        </Stack>
    </Card>
}

export const MenuPage = withRole("Service")(() => {
    const dishes = useSelector(selectors.dishes)
    const dispatch = useDispatch()
    const [types, setTypes] = useQueryParam('types', ArrayParam)
    const [filter, setFilter] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        dispatch(getDishes(filter))
    }, [filter])
    useEffect(() => {
        setLoading(false)
    }, [dishes.items])
    return <Container>
        <Stack spacing={2}>
            <SearchComponent setFilter={setFilter}/>
            {loading ? <Preloader/> : dishes.items.map(catering => <DishListComponent catering={catering}/>)}
            <Paginator totalCount={dishes.totalCount} setFilter={setFilter}/>
        </Stack>
    </Container>
})