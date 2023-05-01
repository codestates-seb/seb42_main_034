import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitProps {
  [key: string]: any;
  memberId: number;
  nickName: string;
  location: string;
  address: string;
  avatarUrl: string;
}
interface Location {
  latitude: '';
  longitude: '';
}
export const initialState: InitProps = {
  memberId: 0,
  nickName: '',
  location: '',
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
    deleteUserInfo: () => initialState,
  },
});

export const { setUserInfo, updateUserInfo, deleteUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
