import { createSlice } from "@reduxjs/toolkit";

interface initialState {
    lat: number;
    lon: number;
}

const initialState: initialState = {
    lat: 33.452612905667934,
    lon: 126.57087765868735,
};

const geoLocationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        change: (state, action) => {
            state = {...state, ...action.payload};
            return state;
        },
    },
});


export const { change } = geoLocationSlice.actions;
export default geoLocationSlice.reducer;