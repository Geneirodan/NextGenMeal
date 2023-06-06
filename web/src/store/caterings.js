import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../utils/pagedArray";
import {commonDelete, commonGet, commonPost, commonPut, getSelector, setErrors, setUpdated} from "./common";

const {actions, name, reducer} = createSlice({
    name: 'caterings',
    initialState: {
        caterings: new PagedArray(),
    },
    reducers: {
        cateringsSuccess: (state, action) => {
            state.caterings = new PagedArray(action.payload)
        }
    },
});
export default reducer
export const selector = getSelector(name)
export const {cateringsSuccess} = actions
export const getCaterings = (filter = null) => commonGet('Catering', filter, cateringsSuccess)
export const editCatering = catering => commonPut('Catering', catering, setUpdated, setErrors)
export const addCatering = catering => commonPost('Catering', catering, setUpdated, setErrors)
export const deleteCatering = id => commonDelete('Catering', id, setUpdated, setErrors)
export const editTerminal = terminal => commonPut('Terminal', terminal, setUpdated, setErrors)
export const addTerminal = terminal => commonPost('Terminal', terminal, setUpdated, setErrors)
export const deleteTerminal = id => commonDelete('Terminal', id, setUpdated, setErrors)