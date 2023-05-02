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
    name: 'service.caterings',
    initialState: {
        ...commonInitialState,
        caterings: new PagedArray(),
        terminals: new PagedArray(),
    },
    reducers: {
        ...commonReducers,
        cateringsSuccess: (state, action) => {
            state.caterings = new PagedArray(action.payload)
        },
        terminalsSuccess: (state, action) => {
            state.terminals = new PagedArray(action.payload)
        }
    },
});
export default {name, reducer}
export const selector = getSelector(name)
export const {resetErrors, setUpdated, cateringsSuccess, terminalsSuccess, setErrors} = actions
export const getCaterings = (filter = null) => commonGet('Catering', filter, cateringsSuccess)
export const editCatering = catering => commonPut('Catering', catering, setUpdated, setErrors)
export const addCatering = catering => commonPost('Catering', catering, setUpdated, setErrors)
export const deleteCatering = id => commonDelete('Catering', id, setUpdated, setErrors)

export const getTerminals = (filter = null) => commonGet('Terminal', filter, terminalsSuccess)
export const editTerminal = terminal => commonPut('Terminal', terminal, setUpdated, setErrors)
export const addTerminal = terminal => commonPost('Terminal', terminal, setUpdated, setErrors)
export const deleteTerminal = id => commonDelete('Terminal', id, setUpdated, setErrors)