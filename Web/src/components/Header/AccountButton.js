import {useDispatch, useSelector} from "react-redux";
import {selectors, signOut} from "../../store/account/login";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AccountComponent} from "./AccountComponent";
import {LoginButton} from "./LoginButton";
import React from "react";

const menuItem = class {
    constructor(title, route) {
        this.title = title
        this.route = route
    }
}
export const AccountButton = () => {
    const role = useSelector(selectors.role)
    const navigate = useNavigate()
    const {t} = useTranslation();
    const dispatch = useDispatch()

    const menuItemOnClick = route => () => navigate(route);
    const logoutCallback = () => {
        dispatch(signOut())
    }
    const profileItem = new menuItem(t("Profile"), "/profile")
    const menuItems = {
        "Customer": [
            new menuItem(t("My Orders"), "/profile/orders")
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
        ? <AccountComponent
            menuItems={[profileItem, ...menuItems[role]]}
            menuItemOnClick={menuItemOnClick}
            logoutCallback={logoutCallback}
            t={t}/>
        : <LoginButton onClick={() => navigate("/login")}/>
};