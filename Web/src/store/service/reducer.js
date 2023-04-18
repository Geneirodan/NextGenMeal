import {createSlice} from "@reduxjs/toolkit";

class PagedArray{
    constructor({items, totalPages}) {
        this.items = items
        this.totalPages = totalPages
    }
}

export const slice = createSlice({
    name: 'service',
    initialState: {
        caterings: new PagedArray([], 0)
    },
    reducers: {
        cateringsSuccess: (state, action) => {
            state.caterings = new PagedArray(action.payload)
        },
    },
});
export default slice.reducer
