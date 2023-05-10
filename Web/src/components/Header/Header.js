import React, {memo, useCallback} from 'react'
import {useTranslation} from 'react-i18next';
import {AppBar, Stack, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {LanguageSelect} from "./LanguageSelect";
import {MeasureSelect} from "./MeasureSelect";
import {AccountButton} from "./AccountButton";

export const Header = memo(
    () => {
        const {t} = useTranslation();
        const navigate = useNavigate()
        const onLogoClick = useCallback(() => navigate("/"), [navigate])
        const onCateringClick = useCallback(() => navigate("/caterings"), [navigate])
        const onAppClick = useCallback(() => navigate("/app"), [navigate])
        const onTerminalsClick = useCallback(() => navigate("/terminals"), [navigate])
        const onMakeOrderClick = useCallback(() => navigate("/order"), [navigate])
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
                        <Button color="inherit" onClick={onCateringClick}>
                            {t("Caterings")}
                        </Button>
                        <Button color="inherit" onClick={onAppClick}>
                            {t("Mobile App")}
                        </Button>
                        <Button color="inherit" onClick={onTerminalsClick}>
                            {t("Terminals")}
                        </Button>
                        <Button variant="contained" color="success" onClick={onMakeOrderClick}>
                            {t("Make order")}
                        </Button>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end" spacing={3}>
                        <MeasureSelect pl={3}/>
                        <AccountButton/>
                        <LanguageSelect pl={3}/>
                    </Stack>
                </Toolbar>
            </AppBar>
        )
    }
)
