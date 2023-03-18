import { PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createSlice } from '@reduxjs/toolkit';

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
  avgGrade: number;
  value: string;
  key: string;
}

const initialState: InitProps = {
  memberId: 0,
  nickname: '',
  location: {
    latitude: '',
    longitude: '',
  },
  address: '',
  totalCount: 0,
  avatarUrl: '',
  avgGrade: 0,
  value: '',
  key: '',
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (_, action) => action.payload,
    updateUserInfo: (state, action: PayloadAction<InitProps>) => {
      const { key } = action.payload;

      state[key] = action.payload.value;
    },
  },
});

export const { setUserInfo, updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
setUserInfo({
  memberId: 0,
  nickname: '',
  location: {
    latitude: '',
    longitude: '',
  },
  address: '',
  totalCount: 0,
  avatarUrl: '',
  avgGrade: 0,
  value: '',
  key: '',
});
