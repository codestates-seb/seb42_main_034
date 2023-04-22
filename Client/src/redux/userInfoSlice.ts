import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitProps {
  [key: string]: any;
  memberId: number;
  nickname: string;
  location: {
    latitude: string;
    longitude: string;
  };
  address: string;
  avatarUrl: string;
}

const initialState: InitProps = {
  memberId: 0,
  nickname: '',
  location: {
    latitude: '',
    longitude: '',
  },
  address: '',
  avatarUrl: '',
  avgGrade: 0,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (_, action: PayloadAction<InitProps>) => action.payload,
    updateUserInfo: (state, action: PayloadAction<{ key: string; value: string }>) => {
      const { key } = action.payload;
      state[key] = action.payload.value;
    },
  },
});

export const { setUserInfo, updateUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
