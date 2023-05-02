import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectors} from "../../store/account/login";

export const withAuth = WrappedComponent =>
    (props) => {
        const role = useSelector(selectors.role)
        return !role ? <Navigate to='/login'/> : <WrappedComponent {...props}/>;
    };

export const withRole = useRole =>
    WrappedComponent =>
        props => {
            const role = useSelector(selectors.role)
            return role !== useRole ? <Navigate to='/'/> : <WrappedComponent {...props}/>;
        };