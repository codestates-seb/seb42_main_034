import { useMutation, useQuery } from '@tanstack/react-query';
import { getFilterData, useGetData } from 'api/data';
import { MoveBtn } from 'pages/question/QuestionBoardList';
import React, { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import AnswerList from './board/AnswerList';
import { Flex } from './style/cssTemplete';
import TextInput from './ui/Input';
import { getAnswerData, postAnswerData } from 'redux/answer/answerslice';
import useAPI from 'hooks/uesAPI';
export default function Answer({ questionId }: { questionId: number | string | undefined }) {
  const [content, setComment] = useState<string>('');
  // const { postAnswerData } = useGetData(); // data.ts에서 정리할것
  const dispatch = useAppDispatch();
  const api = useAPI();
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const answer = useAppSelector((state) => state.answer);
  const isFiltered = getFilterData();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // postAnswerData(questionId, { content, memberId }).catch(console.log);
    console.log(content);

    await api.post(`/questions/answer/${questionId}`, { content, memberId }).catch(console.error);
    // dispatch(postAnswerData(response.data));

    getAnswer().catch(console.error); //이게 최선은 아닐텐데...ㅎㅎ 리팩토링 필수
  };
  // const {
  //   refetch: answerFetch,
  //   data: answer,
  //   isLoading,
  //   error,
  // } = useQuery(['answer', questionId] as const, async () => await getAnswerData(questionId), {
  //   staleTime: 1000 * 15,
  // });
  // const { mutate, data: answer } = useMutation({
  //   mutationKey: ['answer'],

  //   mutationFn: () => postAnswerData(questionId, { content, memberId }),
  //   onSuccess: (res) => {
  //     console.log(res);
  //   },
  // });
  const getAnswer = async () => {
    const response = await api.get(`questions/answer/${questionId}?page=1&sortedBy=hot`);
    console.log(response);

    dispatch(getAnswerData(response.data));
  };
  useEffect(() => {
    getAnswer().catch(console.error);
  }, []);

  return (
    <AnswerWrapper>
      {/* <h3>답변내용 ( 답변 수 : {answer.length} )</h3> */}
      <p>댓글 작성</p>
      <StyledForm onSubmit={submitHandler}>
        <StyledInput type="text" placeholder="댓글을 입력해주세요" setState={setComment} />
        <MoveBtn children="작성" />
        {/* 추후에 위치정보도 함께 첨부  */}
      </StyledForm>
      <AnswerList questionId={questionId} answer={answer} />
    </AnswerWrapper>
  );
}

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const StyledInput = styled(TextInput)`
  height: 5rem;
  width: 50%;
  border-radius: 0.3rem;
`;
const AnswerWrapper = styled.div`
  margin-top: 50px;
`;

const AnswerContainer = styled.ul`
  list-style: none;
  width: 70em;
`;

const AnswerItem = styled.li`
  padding: 20px;
  border: 1px solid gray;
  margin-bottom: 20px;
`;

const AnswerContent = styled.div`
  margin-top: 10px;
`;
export interface answerReturn {
  questionId: number | string;
  content: string;
  title: string;
  tag: string;
  writer: string;
  createdAt: string;
}
const initialData: answerReturn = {
  questionId: 0,
  content: '',
  title: '',
  tag: '',
  writer: '',
  createdAt: '',
};
