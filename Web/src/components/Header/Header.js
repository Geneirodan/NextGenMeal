import React, {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next';
import {AppBar, Stack, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {LanguageSelect} from "./LanguageSelect";
import {AccountButton} from "./AccountButton";
import {useSelector} from "react-redux";
import {selector} from "../../store/auth";
import {roles} from "../../utils/constants";

export const Header = memo(
    () => {
        const {t} = useTranslation()
        const navigate = useNavigate()
        const role = useSelector(selector("role"))
        const onLogoClick = useCallback(
            () => navigate("/"),
            [navigate]
        )
        const onAppClick = useCallback(
            () => navigate("/mobile_app"),
            [navigate]
        )
        const onTerminalsClick = useCallback(
            () => navigate("/about_terminals"),
            [navigate]
        )
        const onMakeOrderClick = useCallback(
            () => navigate("/my_orders/new"),
            [navigate]
        )
        return (
            <AppBar component="header" position="sticky" sx={{display: "flex"}}>
                <Toolbar>
                    <Typography variant="h5" component="p" onClick={onLogoClick}>
                        NextGenMeal
                    </Typography>
                    <Stack direction="row"
                           ml={3}
                           spacing={3}
                           sx={{flexGrow: 1}}
                           component="nav">
                        <Button color="inherit" onClick={onAppClick}>
                            {t("Mobile App")}
                        </Button>
                        <Button color="inherit" onClick={onTerminalsClick}>
                            {t("Terminals")}
                        </Button>
                        {
                            role === roles.Customer &&
                            <Button variant="contained" color="success" onClick={onMakeOrderClick}>
                                {t("Make order")}
                            </Button>
                        }
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end" spacing={3}>
                        <AccountButton/>
                        <LanguageSelect pl={3}/>
                    </Stack>
                </Toolbar>
            </AppBar>
        )
    }
)
