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
  isChecked?: boolean;
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
  isChecked?: boolean;
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
    setIsChecked: (
      state,
      { payload: { isChecked, questionId } }: PayloadAction<{ isChecked: boolean; questionId: number }>,
    ) => {
      //해당되는것만 변경
      state.data = state.data.map((data) => (data.questionId === questionId ? { ...data, isChecked } : data));
    },
  },
});

export const { setBoardDetails, setIsChecked } = boardDetailSlice.actions;
export default boardDetailSlice.reducer;
