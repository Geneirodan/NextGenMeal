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
    name: 'menu',
    initialState: {
        ...commonInitialState,
        dishes: new PagedArray(),
        types: []
    },
    reducers: {
        ...commonReducers,
        dishesSuccess: (state, {payload}) => {
            state.dishes = new PagedArray(payload)
        },
        typesSuccess: (state, {payload}) => {
            state.types = payload
        }
    }
});
export default reducer
export const selector = getSelector(name)
export const {dishesSuccess, resetErrors, setErrors, setUpdated, typesSuccess} = actions
export const getDishes = (filter = null) => commonGet('Dish', filter, dishesSuccess)
export const getTypes = (filter = null) => commonGet('Dish/Types', filter, typesSuccess)
export const editDish = dish => commonPut('Dish', dish, setUpdated, setErrors)
export const addDish = dish => commonPost('Dish', dish, setUpdated, setErrors)
export const deleteDish = id => commonDelete('Dish', id, setUpdated, setErrors)