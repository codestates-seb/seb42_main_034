import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitProps {
  isLogin: boolean;
  id?: string;
  nickname?: string;
  userId?: string;
  accessToken?: string;
  address?: string;
  email?: string;
}

const initialState: InitProps = {
  isLogin: false,
};

const loginInfoSlice = createSlice({
  name: 'loginInfo',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<InitProps>) => {
      return { ...state, ...action.payload };
    },
    logout: () => initialState,
  },
});

export const { login, logout } = loginInfoSlice.actions;
export default loginInfoSlice.reducer;
