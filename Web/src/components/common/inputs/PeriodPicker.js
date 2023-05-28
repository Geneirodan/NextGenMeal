import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import React, {memo, useCallback, useEffect} from "react";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {useTranslation} from "react-i18next";
import {useQueryParam} from "use-query-params";


const PointTimePicker = memo(
    ({filter, setFilter, label, name}) => {
        const [param, setParam] = useQueryParam(name)
        const onChange = useCallback(
            value => setParam(value.toISOString()),
            [filter, setFilter]
        )
        useEffect(
            () => {
                if (param)
                    setFilter({
                        ...filter,
                        [name]: param || null,
                    })
                else {
                    let newFilter = {...filter}
                    delete newFilter[name]
                    setFilter(newFilter)
                }
            },
            [param]
        )
        return <DateTimePicker label={label} value={filter[name]} onChange={onChange}/>;
    }
)

export const PeriodPicker = memo(
    ({filter, setFilter}) => {
        const {t, i18n} = useTranslation()
        return <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.resolvedLanguage}>
            <PointTimePicker label={t("Choose start time")} filter={filter} setFilter={setFilter} name="startTime"/>
            <PointTimePicker label={t("Choose end time")} filter={filter} setFilter={setFilter} name="endTime"/>
        </LocalizationProvider>
    }
)

