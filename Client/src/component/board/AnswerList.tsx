import { useQuery } from '@tanstack/react-query';
import { BoardData, useGetData } from 'api/data';
import { AxiosResponse } from 'axios';
import { Flex } from 'component/style/cssTemplete';
import React, { useEffect } from 'react';
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

export default function AnswerList({ questionId }: { questionId: number | string }) {
  const { getAnswerData } = useGetData();
  const {
    isLoading,
    error,
    data: answer,
  } = useQuery(['answer', questionId] as const, async () => await getAnswerData(questionId), {
    staleTime: 1000 * 15,
  });

  console.log(answer);
  const isAnswerArray = Array.isArray(answer);
  return (
    <AnswerWrapper>
      <h3>답변내용 ( 답변 수 : {isAnswerArray && answer.length} )</h3>
      <AnswerContainer>
        {Array.isArray(answer) &&
          answer.map((answer, idx) => (
            <AnswerItem key={idx}>
              <Flex>
                <div>{answer.content}</div>
              </Flex>
              <AnswerContent>{answer.createAt}</AnswerContent>
            </AnswerItem>
          ))}
      </AnswerContainer>
    </AnswerWrapper>
  );
}
