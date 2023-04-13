import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next';
import {AppBar, IconButton, Menu, MenuItem, Select, Stack, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {languages} from "../../utils/i18n";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {userSelectors} from "../../store/user/selectors";
import {logout} from "../../store/user/thunks";

const LanguageSelect = () => {
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
                   value={i18n.language}
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

const AccountComponent = () => {
    const role = useSelector(userSelectors.role)
    const navigate = useNavigate()
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = event => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const logoutCallback = () => {
        dispatch(logout())
    }
    const getMenu = role => {
        switch (role) {
            case "Customer":
                return <MenuItem onClick={() => navigate("/myorders")}>{t("My Orders")}</MenuItem>
            case "Service":
                return <MenuItem onClick={() => navigate("/caterings")}>{t("Caterings")}</MenuItem>
            case "Employee":
                return <MenuItem onClick={() => navigate("/orders")}>{t("Orders")}</MenuItem>
            case "Admin":
                return <>
                    <MenuItem onClick={() => navigate("/customers")}>{t("Customers")}</MenuItem>
                    <MenuItem onClick={() => navigate("/services")}>{t("Services")}</MenuItem>
                </>
            default:
                return <></>
        }
    }
    return <>
        {role && (
            <div>
                <IconButton size="large" onClick={handleMenu} color="inherit">
                    <AccountCircle/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => navigate("/profile")}>{t("Profile")}</MenuItem>
                    {getMenu(role)}
                    <MenuItem onClick={logoutCallback}>{t("Logout")}</MenuItem>
                </Menu>
            </div>
        )

        }
        {!role &&
            <IconButton size="large" onClick={() => navigate("/login")} color="inherit">
                <LoginIcon/>
            </IconButton>
        }
    </>;
};

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
                <Button color="inherit" onClick={() => navigate("/orders")}>
                    {t("Mobile App")}
                </Button>
                <Button color="inherit" onClick={() => navigate("/orders")}>
                    {t("Terminals")}
                </Button>
                <Button variant="contained" color="success" onClick={() => navigate("/order")}>
                    {t("Make order")}
                </Button>
            </Stack>
            <Stack direction="row" ustifyContent="flex-end" spacing={3}>
                <AccountComponent/>
                <LanguageSelect pl={3}/>
            </Stack>
        </Toolbar>
    </AppBar>
}
