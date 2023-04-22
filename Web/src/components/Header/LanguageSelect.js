import {useTranslation} from "react-i18next";
import {MenuItem, Select} from "@mui/material";
import {languages} from "../../utils/i18n";
import React from "react";

export const LanguageSelect = () => {
    const {i18n} = useTranslation();

    const onChange = async (event, language) => {
        await i18n.changeLanguage(language.props.value)
    };
    const langItem = (language) =>
        <MenuItem key={language} value={language}>
            {language.toUpperCase()}
        </MenuItem>;
    return <Select color="inherit"
                   variant="standard"
                   value={i18n.resolvedLanguage}
                   onChange={onChange}
                   disableUnderline={true}
                   sx={{
                       color: "inherit",
                       ".MuiSvgIcon-root ": {
                           fill: "white !important",
                       }
                   }}>
        {languages.map(langItem)}
    </Select>;
};