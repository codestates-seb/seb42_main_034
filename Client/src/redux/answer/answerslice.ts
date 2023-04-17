import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageProps } from 'redux/boardDetails';
export interface AnswerData {
  answerId: string | number;
  checked: boolean;
  content: string;
  likeCnt: number;
  location: string | null;
  memberId: number;
  questionId?: number;
  blogId?: string;
}
export interface AllAnswer {
  answers: AnswerData[] | [];
  pageInfo: PageProps;
}
const initialState: AllAnswer = {
  answers: [],
  pageInfo: {
    totalElements: 0,
    size: 0,
    page: 0,
    totalPages: 0,
  },
};
const answerslice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    getAnswerData: (state, { payload: { data } }: PayloadAction<{ data: AllAnswer }>) => {
      state = data;
      return state;
    },
    postAnswerData: (state, { payload: { answers } }: PayloadAction<{ answers: AnswerData[] }>) => {
      state = { ...state, answers };
    },
  },
});

export const { getAnswerData, postAnswerData } = answerslice.actions;
export default answerslice.reducer;
