import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
    name: 'alarm',
    initialState: { hasNewMessage: false },
    reducers: {
        setState: (state, action) => {
            state.hasNewMessage = action.payload;
        },
    },
});

export const { setState } = alertSlice.actions;
export default alertSlice.reducer;