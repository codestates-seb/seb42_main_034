import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageProps } from 'redux/boardDetails';
export interface AnswerData {
  answerId: string | number;
  checked: boolean;
  content: string;
  likeCnt: number;
  memberId: number;
}
export interface AllAnswer {
  answers: AnswerData[] | [];
}
const initialState: AllAnswer = {
  answers: [],
};
const answerslice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    getAnswerData: (state, { payload: { answers } }: PayloadAction<{ answers: AllAnswer }>) => {
      state = answers;
      return state;
    },
    postAnswerData: (state, { payload: { answers } }: PayloadAction<{ answers: AnswerData[] }>) => {
      state = { ...state, answers };
    },
  },
});

export const { getAnswerData, postAnswerData } = answerslice.actions;
export default answerslice.reducer;
