import {useDispatch} from "react-redux";
import {useEffect} from "react";

export const useErrors = (open, resetForm, resetErrors) => {
    const dispatch = useDispatch()
    useEffect(() => () => {
        dispatch(resetErrors());
    }, [])
    useEffect(() => {
        open && resetForm();
    }, [open])
};