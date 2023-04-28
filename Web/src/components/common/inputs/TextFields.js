import {IconButton, TextField} from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';

export const SearchTextField = ({onClick, ...restProps}) => {
    return <CustomTextField
        name="query"
        InputProps={{
            endAdornment: (
                <IconButton variant="contained" position="start" type="submit">
                    <SearchIcon/>
                </IconButton>
            ),
        }} {...restProps}/>
}

export const CustomTextField = ({formik, name, ...restProps}) => {
    return <TextField
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        {...restProps}
    />;
};