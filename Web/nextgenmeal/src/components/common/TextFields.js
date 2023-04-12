import {TextField} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";

export const EmailTextField = props => <CustomTextField name="email" {...props}/>
export const NameTextField = props => <CustomTextField name="name" {...props}/>
export const PasswordTextField = props => <CustomTextField name="password" type="password" {...props}/>
export const ConfirmPasswordTextField = props => <CustomTextField name="confirmPassword" type="password" {...props}/>

const CustomTextField = props => {
    const {t} = useTranslation();
    return <TextField
        id={props.name}
        name={props.name}
        label={t(props.name)}
        value={props.formik.values[props.name]}
        onChange={props.formik.handleChange}
        error={props.formik.touched[props.name] && Boolean(props.formik.errors[props.name])}
        helperText={props.formik.touched[props.name] && props.formik.errors[props.name]}
        {...props}
    />;
};