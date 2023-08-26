import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageProps } from 'redux/boardDetails';
export interface AnswerData {
  answerId: number;
  checked: boolean;
  content: string;
  likeCnt: number;
  memberId: number;
  comments: [];
  createdAt: string;
}
//로딩이 됐을 때 채택상태가 디스패치 함수와 함께 실행 돼서 추적 되어야함
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
    getAnswersData: (state, { payload: { answers } }: PayloadAction<{ answers: AnswerData[] }>) => {
      state.data = answers;
      console.log(state, answers);

      return state;
    },
    // postAnswerData: (state, { payload: { answers } }: PayloadAction<{ answers: AnswerData[] }>) => {
    //   state = { ...state, answers };
    // },
    getAnswerLike: (state, { payload: { answer } }: PayloadAction<{ answer: AnswerData[] }>) => {
      // state.answers?.map((el) => (el.checked ? { ...el, checked: true } : el));
      console.log(state);

      // state.answers = mapAnswer;
    },
  },
});

export const { getAnswerLike, getAnswersData } = answerslice.actions;
export default answerslice.reducer;
