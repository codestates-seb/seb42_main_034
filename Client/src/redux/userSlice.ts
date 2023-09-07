import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitProps {
  isLogin: boolean;
  memberId?: any;
  nickname?: string;
  username?: string;
  accessToken?: string;
  refresh?: string;
  address?: string;
  email?: string;
  avatarUrl?: string;
}

const initialState: InitProps = {
  isLogin: false,
  memberId: '',
  nickname: '',
  username: '',
  accessToken: '',
  refresh: '',
  address: '',
  email: '',
  avatarUrl: '',
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
