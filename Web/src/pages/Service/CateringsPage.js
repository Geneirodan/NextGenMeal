import {withRole} from "../../hoc/withAuth";
import selectors from "../../store/service/selectors"
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
    Pagination,
    Stack,
    Typography
} from "@mui/material";
import {CustomTextField, SearchTextField} from "../../components/common/TextFields";
import React, {useEffect, useState} from "react";
import {getCaterings} from "../../store/service/thunks";
import {useFormik} from "formik";
import {useTranslation} from "react-i18next";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import {useNavigate} from "react-router-dom";
import {NumberParam, useQueryParam} from "use-query-params";
import {Preloader} from "../../components/common/Preloader";
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import {Paginator} from "../../components/common/Paginator";
import {SearchComponent} from "../../components/common/SearchComponent";

const TerminalListComponent = ({onClick, terminal}) => {
    const {t} = useTranslation()
    const [editMode, setEditMode] = useState(false)
    return <Card sx={{padding: 1}}>
        <Stack direction="row">
            <Box sx={{flexGrow: 1}}>
                <Typography>
                    {`${t("Terminal")}:`}
                </Typography>
                <Typography>
                    {terminal.serialNumber}
                </Typography>
            </Box>
            <TerminalEditDialog terminal={terminal} open={editMode} onClose={() => setEditMode(false)}/>
            <IconButton onClick={() => setEditMode(true)}>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={onClick}>
                <Inventory2Icon/>
            </IconButton>
        </Stack>
    </Card>;
};

const CateringEditDialog = ({catering, open, onClose}) => {
    const {t} = useTranslation()
    const onSubmit = values => {
        console.log(values)
    }
    const formik = useFormik({initialValues: catering, onSubmit})
    return <Dialog open={open} keepMounted onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <DialogTitle>{t("Edit catering")}</DialogTitle>
                <Stack spacing={2}>
                    <CustomTextField name="name" formik={formik} label={t("Name")}/>
                    <CustomTextField name="street" formik={formik} label={t("Street")}/>
                    <CustomTextField name="city" formik={formik} label={t("City")}/>
                    <CustomTextField name="state" formik={formik} label={t("State")}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Revert</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </form>
    </Dialog>;
};

const TerminalEditDialog = ({terminal, open, onClose}) => {
    const {t} = useTranslation()
    const onSubmit = values => {
        console.log(values)
    }
    const formik = useFormik({initialValues: terminal, onSubmit})
    return <Dialog open={open} keepMounted onClose={onClose}>
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <DialogTitle>{t("Edit terminal")}</DialogTitle>
                <Stack spacing={2}>
                    <CustomTextField name="serialNumber" formik={formik} label={t("SerialNumber")}/>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Revert</Button>
                <Button type="submit">Save</Button>
            </DialogActions>
        </form>
    </Dialog>;
};

const CateringListComponent = ({catering}) => {
    const {t} = useTranslation()
    const [cateringEdit, setCateringEdit] = useState(false)
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
            <CateringEditDialog catering={catering} open={cateringEdit} onClose={() => setCateringEdit(false)}/>
            <IconButton onClick={() => setCateringEdit(true)}>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={() => navigate(`${catering.id}/menu`)}>
                <RestaurantMenuIcon/>
            </IconButton>
        </Stack>
        {
            catering.terminal && <TerminalListComponent
                terminal={catering.terminal}
                onClick={() => navigate(`${catering.id}/boxes`)}/>
        }
    </Card>
}

export const CateringsPage = withRole("Service")(() => {
    const caterings = useSelector(selectors.caterings)
    const dispatch = useDispatch()
    const [filter, setFilter] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        dispatch(getCaterings(filter))
    }, [filter])
    useEffect(() => {
        setLoading(false)
    }, [caterings.items])
    return <Container>
        <Stack spacing={2}>
            <SearchComponent filter={filter} setFilter={setFilter}/>
            {loading ? <Preloader/> : caterings.items.map(catering => <CateringListComponent catering={catering}/>)}
            <Paginator totalCount={caterings.totalCount} filter={filter} setFilter={setFilter}/>
        </Stack>
    </Container>
})