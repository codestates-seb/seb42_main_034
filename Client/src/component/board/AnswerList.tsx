import { BoardData, useGetData } from 'api/data';

import { Flex } from 'component/style/cssTemplete';
import useAPI from 'hooks/uesAPI';
import { MoveBtn } from 'pages/question/QuestionBoardList';
import React, { useEffect } from 'react';
import { AllAnswer, AnswerData, getAnswerData } from 'redux/answer/answerslice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';

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
  blogId,
  answer,
}: {
  questionId?: number | string | undefined;
  blogId?: number | string | undefined;
  answer: AllAnswer;
}) {
  const api = useAPI();
  const dispatch = useAppDispatch();
  const { deleteAnswerData } = useGetData();
  console.log(answer);
  const deleteAnswer = (answerId: number | string) => {
    deleteAnswerData('questions', answerId).catch(console.error);
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
const AnswerWrapper = styled.div`
  margin-top: 50px;
`;

const AnswerContainer = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
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
