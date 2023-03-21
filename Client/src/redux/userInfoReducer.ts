import { createSlice } from "@reduxjs/toolkit";

interface InitProps {
    [key: string]: any;
    memberId: number;
    nickname: string;
    location: {
        latitude: string;
        longitude: string;
    };
    address: string;
    totalCount: number;
    avatarUrl: string;
}

const initialState: InitProps = {
    memberId: 0,
    nickname: '',
    location: {
        latitude:"",
        longitude:""
    },
    address:'',
    totalCount: 0,
    avatarUrl:"",
}

const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo:(_, action) => action.payload,
        updateUserInfo: (state, action) => {
            const {key} = action.payload;
            state[key] = action.payload.value;
        }
    }
})

export const {setUserInfo, updateUserInfo} = userInfoSlice.actions;
export default userInfoSlice.reducer;