import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getTypes, selector} from "../../store/service/menu";
import {ArrayParam, useQueryParam} from "use-query-params";
import React, {useCallback, useEffect} from "react";
import {Autocomplete, TextField} from "@mui/material";

export const TypeSelect = ({filter, setFilter}) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const types = useSelector(selector("types"))
    const [type, setType] = useQueryParam('type', ArrayParam)
    useEffect(() => {
        dispatch(getTypes())
    }, [])
    useEffect(() => {
        if (type && type.length > 0)
            setFilter({...filter, types: type})
        else {
            if(filter.types)
                delete filter.types
            setFilter({...filter})
        }
    }, [type])
    const onChange = useCallback((e, value) => setType(value), [])
    const RenderInput = params => <TextField name="type" label={t("Types")} {...params}/>;

    return <Autocomplete multiple
                         value={type}
                         options={types}
                         onChange={onChange}
                         filterSelectedOptions
                         renderInput={RenderInput}/>

}