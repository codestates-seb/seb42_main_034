import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitProps {
  [key: string]: any;
  memberId: number;
  nickname: string;
  username: string;
  location: {
    latitude: string;
    longitude: string;
  };
  address: string;
  totalCount: number;
  avatarUrl: string;
  key: string;
  value: string;
}

const initialState: InitProps = {
  memberId: 0,
  username: '',
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
    setUserInfo: (_, action: PayloadAction<InitProps>) => action.payload,
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
  username: '',
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
