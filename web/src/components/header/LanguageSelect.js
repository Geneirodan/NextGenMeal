import {useTranslation} from "react-i18next";
import {MenuItem, Select} from "@mui/material";
import {languages} from "../../utils/i18n";
import React, {memo, useCallback} from "react";

export const LanguageSelect = memo(
    () => {
        const {i18n} = useTranslation();
        const onChange = useCallback(
            async (event, language) => {
                await i18n.changeLanguage(language.props.value)
            },
            [i18n]
        )
        const langItem = useCallback(
            language =>
                <MenuItem key={language} value={language}>
                    {language.toUpperCase()}
                </MenuItem>,
            []
        )
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
            {
                languages.map(langItem)
            }
        </Select>;
    }
)