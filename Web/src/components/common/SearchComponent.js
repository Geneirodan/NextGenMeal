import {useQueryParam} from "use-query-params";
import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import {CustomTextField} from "./inputs/CustomTextField";
import {IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchIconButton = () =>
    <IconButton variant="contained" position="start" type="submit">
        <SearchIcon/>
    </IconButton>;

export const SearchComponent = ({filter, setFilter}) => {
    const [query, setQuery] = useQueryParam('query')
    useEffect(() => setFilter({...filter, query: query ? query : ''}), [query])
    const onSubmit = ({query}) => setQuery(!!query ? query : null);
    const {t} = useTranslation()
    const initialValues = {query: query ? query : ''};
    const formik = useFormik({initialValues, onSubmit});
    return <form onSubmit={formik.handleSubmit}>
        <CustomTextField
            name="query"
            InputProps={{endAdornment: <SearchIconButton/>}}
            formik={formik}
            label={t("Search")}
            sx={{width: "100%"}}/>
    </form>;
};