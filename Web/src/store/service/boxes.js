import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../../utils/pagedArray";
import {
    commonDelete,
    commonGet,
    commonInitialState,
    commonPost,
    commonPut,
    commonReducers,
    getSelector
} from "../common";

const {actions, name, reducer} = createSlice({
    name: 'service.boxes',
    initialState: {
        ...commonInitialState,
        boxes: new PagedArray()
    },
    reducers: {
        ...commonReducers,
        boxesSuccess: (state, action) => {
            state.boxes = new PagedArray(action.payload)
        },
    },
});
export default {name, reducer}
export const selector = getSelector(name)
export const {boxesSuccess, resetErrors, setErrors, setUpdated} = actions
export const getBoxes = (filter = null) => commonGet('Box', filter, boxesSuccess)
export const editBox = box => commonPut('Box', box, setUpdated, setErrors)
export const addBox = box => commonPost('Box', box, setUpdated, setErrors)
export const deleteBox = id => commonDelete('Box', id, setUpdated, setErrors)