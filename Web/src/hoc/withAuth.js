import React from "react";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelectors} from "../store/user/selectors";

export const withAuth = WrappedComponent =>
    (props) => {
        const role = useSelector(userSelectors.role)
        return !role ? <Navigate to='/login'/> : <WrappedComponent {...props}/>;
    };

export const withRole = useRole =>
    WrappedComponent =>
        props => {
            const role = useSelector(userSelectors.role)
            return role !== useRole ? <Navigate to='/'/> : <WrappedComponent {...props}/>;
        };