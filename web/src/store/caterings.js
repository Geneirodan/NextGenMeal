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
export const editCatering = catering => commonPut('Catering', catering)
export const addCatering = catering => commonPost('Catering', catering)
export const deleteCatering = id => commonDelete('Catering', id)
export const editTerminal = terminal => commonPut('Terminal', terminal)
export const addTerminal = terminal => commonPost('Terminal', terminal)
export const deleteTerminal = id => commonDelete('Terminal', id)