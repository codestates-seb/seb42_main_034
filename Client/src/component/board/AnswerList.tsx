import React from 'react';
import styled from 'styled-components';

const AnswerWrapper = styled.div`
  margin-top: 50px;
`;

const Title = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const AnswerContainer = styled.ul`
  list-style: none;
`;

const AnswerItem = styled.li`
  padding: 20px;
  border: 1px solid gray;
  margin-bottom: 20px;
`;

const AnswerContent = styled.div`
  margin-top: 10px;
`;

export default function AnswerList() {


  return (
    <AnswerWrapper>
      <AnswerContainer>
        {/* {answers.map((answer) => (
          <AnswerItem key={answer.id}>
            <div>{answer.content}</div>
            <AnswerContent>{answer.createAt}</AnswerContent>
          </AnswerItem>
        ))} */}
        <AnswerItem>
          답변 내용~
          <AnswerContainer>작성 시간</AnswerContainer>
        </AnswerItem>
      </AnswerContainer>
    </AnswerWrapper>
  );
}
