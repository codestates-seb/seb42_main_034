//boarddetails.ts
import { ReturnData } from 'api/data';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface ListData {
  questionId?: string | number;
  title: string;
  tags: string[];
  writer: string;
  createdAt: string;
  modifiedAt: string | null;
  viewCnt: number;
  likeCnt: number;
}
export interface PageProps {
  totalElements: number;
  size: number;
  page: number;
  totalPages: number;
}
export interface BlogData {
  createdAt: string;
  modifiedAt?: string;
  blogId: string | number;
  tags: string[];
  title: string;
  viewCnt: number;
  writer: string;
  content?: string;
}
const initialState: ReturnData = {
  data: [],
  pageInfo: {
    totalElements: 15,
    size: 15,
    page: 1,
    totalPages: 2,
  },
};

const boardDetailSlice = createSlice({
  name: 'boardDetail',
  initialState,
  reducers: {
    //원래 state에서 actionpayload로 받은값으로 state를 변경해줌
    setBoardDetails: (state, { payload: { data } }: PayloadAction<{ data: ListData[] }>) => {
      return { ...state, data };
    },
  },
});

export const { setBoardDetails } = boardDetailSlice.actions;
export default boardDetailSlice.reducer;
