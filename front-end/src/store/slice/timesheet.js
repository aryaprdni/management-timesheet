import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {};

export const timesheetSlice = createSlice({
    name: 'timesheet',
    initialState: initialAuthState,
    reducers: {
        CREATE_TIMESHEET(state, action) {
            state.data = action.payload
        },
        UPDATE_TIMESHEET(state, action) {
            state.data = action.payload
        },
        DELETE_TIMESHEET(state, action) {
            state.data = action.payload
        },
        GET_TIMESHEET(state, action) {
            state.data = action.payload
        },
    },
})

export const { CREATE_TIMESHEET, UPDATE_TIMESHEET, DELETE_TIMESHEET, GET_TIMESHEET } = timesheetSlice.actions;
export default timesheetSlice.reducer;