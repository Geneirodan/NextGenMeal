import React, {useState} from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

export const AccountComponent = ({menuItems, menuItemOnClick, logoutCallback, t}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = event => setAnchorEl(event.currentTarget);
    const getMenuItem = item => (
        <MenuItem onClick={menuItemOnClick(item.route)}>
            {item.title}
        </MenuItem>);

    return <div>
        <IconButton size="large" onClick={handleMenu} color="inherit">
            <AccountCircle/>
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: "bottom", horizontal: "right"}}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}>

            {menuItems.map(getMenuItem)}

            <MenuItem onClick={logoutCallback}>
                {t("Logout")}
            </MenuItem>
        </Menu>
    </div>;
};