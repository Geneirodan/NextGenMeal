import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../../utils/pagedArray";

export const slice = createSlice({
    name: 'service',
    initialState: {
        caterings: new PagedArray({items: [], totalCount: 0}),
        dishes: new PagedArray({items: [], totalCount: 0}),
        types: []
    },
    reducers: {
        cateringsSuccess: (state, action) => {
            state.caterings = new PagedArray(action.payload)
        },
        dishesSuccess: (state, action) => {
            state.dishes = new PagedArray(action.payload)
        },
        typesSuccess: (state, action) => {
            state.types = action.payload
        },
    },
});
export default slice.reducer
