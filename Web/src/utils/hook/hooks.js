import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {resetErrors, selector} from "../../store/common";

export const useStepping = () => {
    const [activeStep, setActiveStep] = useState(0)
    const handleNext = useCallback(
        () => setActiveStep(prevState => prevState + 1),
        [setActiveStep]
    )
    const handleBack = useCallback(
        () => setActiveStep(prevState => prevState - 1),
        [setActiveStep]
    )
    return [activeStep, handleNext, handleBack]
};
export const useUpdate = () => {
    return useSelector(selector("updated"));
};
export const useErrors = () => {
    const dispatch = useDispatch()
    useEffect(() => () => {
        dispatch(resetErrors());
    }, [])
    return useSelector(selector("errors"));
};
export const useOpen = () => {
    const [open, setOpen] = useState(false)
    const onClick = useCallback(() => setOpen(true), [])
    const onClose = useCallback(() => setOpen(false), [])
    return [open, onClick, onClose]
};
export const useReset = (open, resetForm) => {
    useEffect(() => {
        open && resetForm();
    }, [open])
};