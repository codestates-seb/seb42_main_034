import { BoardData, useGetData } from 'api/data';

import { Flex } from 'component/style/cssTemplete';
import TextInput from 'component/ui/Input';
import useAPI from 'hooks/uesAPI';
import AnswerItem from 'pages/question/AnswerItem';
import { MoveBtn } from 'pages/question/QuestionBoardList';
import React, { useEffect, useState } from 'react';
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
export interface answerReturn {
  questionId: number | string;
  content: string;
  title: string;
  tag: string;
  writer: string;
  createdAt: string;
}

export default function AnswerList({
  questionId,
  blogId,
  answer,
}: {
  questionId?: number | string | undefined;
  blogId?: number | string | undefined;
  answer: AnswerData[] | [];
}) {
  const api = useAPI();
  const dispatch = useAppDispatch();
  const { deleteAnswerData, putAnswerData } = useGetData();

  console.log(answer);

  const isAnswerArray = Array.isArray(answer);

  return (
    <AnswerWrapper>
      <h3>답변내용 ( 답변 수 : {isAnswerArray && answer.length} )</h3>
      <AnswerContainer>
        {isAnswerArray && answer.map((answer, idx: number) => <AnswerItem answer={answer} key={answer.answerId} />)}
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
