import {createSlice} from "@reduxjs/toolkit";
import {PagedArray} from "../../utils/pagedArray";
import {get} from "../../api/api";

const slice = createSlice({
    name: 'service.boxes',
    initialState: {
        boxes: new PagedArray()
    },
    reducers: {
        boxesSuccess: (state, action) => {
            state.boxes = new PagedArray(action.payload)
        },
    },
});
export default slice.reducer
export const selectors = {
    boxes: state => state.service.boxes
}

const {boxesSuccess} = slice.actions

export const getBoxes = (params = null) => async dispatch => {
    const response = await get('Box', params)
    if (response.ok) {
        const data = await response.json()
        dispatch(boxesSuccess(data))
    }
}