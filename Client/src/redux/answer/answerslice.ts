import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface AnswerData {
  answerId: string | number;
  checked: boolean;
  content: string;
  likeCnt: number;
  location: string | null;
  memberId: number;
  questionId: number;
}
export interface AllAnswer {
  data: AnswerData[] | [];
}
const initialState: AllAnswer = {
  data: [],
};
const answerslice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    getAnswerData: (state, { payload: { data } }: PayloadAction<{ data: AllAnswer }>) => {
      state = data;
      return state;
    },
    postAnswerData: (state, { payload: { data } }: PayloadAction<{ data: AnswerData[] }>) => {
      state = { ...state, data };
    },
  },
});

export const { getAnswerData, postAnswerData } = answerslice.actions;
export default answerslice.reducer;
