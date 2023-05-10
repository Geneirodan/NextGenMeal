import {useDispatch, useSelector} from "react-redux";
import {rename, selector, signOut} from "../../store/account/login";
import {useTranslation} from "react-i18next";
import React, {memo, useCallback, useState} from "react";
import {IconButton, MenuItem, Popover, Stack} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {useNavigate} from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import {ChangeNameDialog} from "../common/dialogs/ChangeNameDialog";
import {EditDialogButton} from "../common/dialogs/EditDialogButton";
import {RenameIconButton} from "../common/buttons/IconButtons";

const menuItem = class {
    constructor(title, route) {
        this.title = title
        this.route = route
    }
}
const AccountButtonComponent = memo(
    ({menuItems}) => {
        const {t} = useTranslation()
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const info = useSelector(selector("info"))
        const [anchorEl, setAnchorEl] = useState(null)
        const handleMenu = useCallback(
            event => setAnchorEl(event.currentTarget),
            [setAnchorEl]
        )
        const onClose = useCallback(
            () => setAnchorEl(null),
            [setAnchorEl]
        )
        const menuItemOnClick = useCallback(
            route => () => navigate(route),
            [navigate]
        )
        const getMenuItem = useCallback(
            item => (
                <MenuItem key={item.title} onClick={menuItemOnClick(item.route)}>
                    {item.title}
                </MenuItem>
            ),
            [menuItemOnClick]
        )
        const logoutCallback = useCallback(
            () => {
                dispatch(signOut())
            },
            [dispatch]
        )
        return (
            <div>
                <IconButton size="large" onClick={handleMenu} color="inherit">
                    <AccountCircle/>
                </IconButton>
                <Popover
                    anchorEl={anchorEl}
                    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                    keepMounted
                    transformOrigin={{vertical: "top", horizontal: "right"}}
                    open={Boolean(anchorEl)}
                    onClose={onClose}>
                    <Stack padding={2} direction="row" alignItems="center">
                        {info.name}
                        <EditDialogButton EditDialog={ChangeNameDialog}
                                          EditButton={RenameIconButton}
                                          editAction={rename}
                                          user={info}/>
                    </Stack>
                    {
                        menuItems.map(getMenuItem)
                    }
                    <MenuItem>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={logoutCallback}>
                        {t("Logout")}
                    </MenuItem>
                </Popover>
            </div>
        )
    }
)
const LoginButton = memo(
    () => {
        const navigate = useNavigate()
        const onClick = useCallback(() => navigate("/login"), []);
        return (
            <IconButton size="large" onClick={onClick} color="inherit">
                <LoginIcon/>
            </IconButton>
        )
    }
)
export const AccountButton = memo(
    () => {
        const role = useSelector(selector("role"))
        const {t} = useTranslation()
        const menuItems = {
            "Customer": [
                new menuItem(t("My Orders"), "/myorders")
            ],
            "Service": [
                new menuItem(t("Caterings"), "/service/caterings")
            ],
            "Employee": [
                new menuItem(t("Orders"), "/service/orders")
            ],
            "Admin": [
                new menuItem(t("Customers"), "/admin/customers"),
                new menuItem(t("Services"), "/admin/services")
            ]
        }
        return role
            ? <AccountButtonComponent menuItems={menuItems[role]}/>
            : <LoginButton/>
    }
)