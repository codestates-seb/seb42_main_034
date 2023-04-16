import { useMutation, useQuery } from '@tanstack/react-query';
import { BoardData, useGetData } from 'api/data';
import { AxiosResponse } from 'axios';
import { Flex } from 'component/style/cssTemplete';
import useAPI from 'hooks/uesAPI';
import { MoveBtn, StyledCategoryBtn } from 'pages/question/BoardList';
import React, { useEffect } from 'react';
import { AllAnswer, AnswerData, getAnswerData } from 'redux/answer/answerslice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';

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
export default function AnswerList({
  questionId,
  answer,
}: {
  questionId: number | string | undefined;
  answer: AllAnswer;
}) {
  // const { getAnswerData } = useGetData();
  const api = useAPI();
  const dispatch = useAppDispatch();
  const { deleteAnswerData } = useGetData();
  // const answer = useAppSelector((state) => state.answer);
  // const {
  //   refetch: answerFetch,
  //   data: answer,
  //   isLoading,
  //   error,
  // } = useQuery(['answer', questionId] as const, async () => await getAnswerData(questionId), {
  //   staleTime: 1000 * 15,
  // });
  //get은 데이터가 바뀌었을 때 다시 해줘야함 ->input의 value가

  // useEffect(() => {
  //   const getAnswer = async () => {
  //     const response = await api.get(`questions/answer/${questionId}?page=1&sortedBy=hot`);
  //     console.log(response);

  //     dispatch(getAnswerData(response.data));
  //   };
  //   getAnswer().catch(console.error);
  // }, []);
  const deleteAnswer = (answerId: number | string) => {
    deleteAnswerData(answerId).catch(console.error);
  };
  const isAnswerArray = Array.isArray(answer);
  return (
    <AnswerWrapper>
      <h3>답변내용 ( 답변 수 : {isAnswerArray && answer.length} )</h3>
      <AnswerContainer>
        {isAnswerArray &&
          answer.map((answer, idx: number) => (
            <AnswerItem key={idx}>
              <Flex>
                <div>{answer.content}</div>
                <MoveBtn children="삭제" onClick={() => deleteAnswer(answer.answerId)} />
              </Flex>

              <AnswerContent>{answer.likeCnt}</AnswerContent>
            </AnswerItem>
          ))}
      </AnswerContainer>
    </AnswerWrapper>
  );
}
