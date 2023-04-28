import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../../utils/pagedArray";
import {del, post, put} from "../../api/api";
import {commonGet, commonInitialState, commonReducers, getSelector, handleResponse} from "../common";

const {actions, name, reducer} = createSlice({
    name: 'service.caterings',
    initialState: {
        ...commonInitialState,
        caterings: new PagedArray(),
    },
    reducers: {
        ...commonReducers,
        cateringsSuccess: (state, action) => {
            state.caterings = new PagedArray(action.payload)
        }
    },
});
export default {name, reducer}
export const selector = getSelector(name)
export const {resetErrors, setUpdated, cateringsSuccess, setErrors} = actions
export const getCaterings = (filter = null) => commonGet('Catering', filter, cateringsSuccess)

export const editCatering = catering => async dispatch => {
    const response = await put('Catering', catering, {id: catering.id})
    await handleResponse(response, dispatch, setUpdated, setErrors);
}

export const addCatering = catering => async dispatch => {
    const response = await post('Catering', catering)
    await handleResponse(response, dispatch, setUpdated, setErrors);
}

export const deleteCatering = id => async dispatch => {
    const response = await del('Catering', {id})
    await handleResponse(response, dispatch, setUpdated, setErrors);
}