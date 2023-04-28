import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";

export const CustomSelect = ({name, formik, items, label, labelId = "type-label"}) => {
    const {t} = useTranslation()
    return <FormControl>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select name={name}
                label={label}
                labelId={labelId}
                value={formik.values[name]}
                onChange={formik.handleChange}
                error={formik.touched[name] && Boolean(formik.errors[name])}
                helperText={formik.touched[name] && formik.errors[name]}>
            {items.map(item => <MenuItem value={item}>{t(item)}</MenuItem>)}
        </Select>
    </FormControl>;
};