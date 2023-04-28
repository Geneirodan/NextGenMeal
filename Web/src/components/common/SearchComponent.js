import {useQueryParam} from "use-query-params";
import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import {SearchTextField} from "./inputs/TextFields";

export const SearchComponent = ({filter, setFilter}) => {
    const [query, setQuery] = useQueryParam('query')
    useEffect(() => {
        setFilter({...filter, query: query ? query : ''})
    }, [query])
    const onSubmit = ({query}) => setQuery(!!query ? query : null);
    const {t} = useTranslation()
    const formik = useFormik({initialValues: {query: query ? query : ''}, onSubmit});
    return <form onSubmit={formik.handleSubmit}>
        <SearchTextField formik={formik} label={t("Search")} sx={{width: "100%"}}/>
    </form>;
};