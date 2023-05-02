import React from 'react'
import {useTranslation} from 'react-i18next';
import {AppBar, Stack, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {LanguageSelect} from "./LanguageSelect";
import {MeasureSelect} from "./MeasureSelect";
import {AccountButton} from "./AccountButton";

export const Header = () => {
    const {t} = useTranslation();
    const navigate = useNavigate()

    return <AppBar component="header" position="sticky" sx={{display: "flex"}}>
        <Toolbar>
            <Typography variant="h5" component="p" onClick={() => navigate("/")}>
                NextGenMeal
            </Typography>
            <Stack direction="row"
                   ml={3}
                   spacing={3}
                   sx={{flexGrow: 1}}
                   component="nav">
                <Button color="inherit" onClick={() => navigate("/caterings")}>
                    {t("Caterings")}
                </Button>
                <Button color="inherit" onClick={() => navigate("/app")}>
                    {t("Mobile App")}
                </Button>
                <Button color="inherit" onClick={() => navigate("/terminals")}>
                    {t("Terminals")}
                </Button>
                <Button variant="contained" color="success" onClick={() => navigate("/order")}>
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
}
