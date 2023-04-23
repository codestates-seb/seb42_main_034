import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageProps } from 'redux/boardDetails';
export interface AnswerData {
  answerId: number;
  checked: boolean;
  content: string;
  likeCnt: number;
  memberId: number;
}
export interface AllAnswer {
  answers: AnswerData[] | [];
}
const initialState = {
  isLike: false,
};
const answerslice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    // getAnswerData: (state, { payload: { answers } }: PayloadAction<{ answers: AllAnswer }>) => {
    //   state = answers;
    //   return state;
    // },
    // postAnswerData: (state, { payload: { answers } }: PayloadAction<{ answers: AnswerData[] }>) => {
    //   state = { ...state, answers };
    // },
    getAnswerLike: (state, { payload: { isLike } }: PayloadAction<{ isLike: boolean }>) => {
      isLike = !isLike;
    },
  },
});

export const { getAnswerLike } = answerslice.actions;
export default answerslice.reducer;
