import { useGetData } from 'api/data';
import { answerReturn } from 'component/question/Answer';
import { Flex } from 'component/style/cssTemplete';
import TextInput from 'component/ui/Input';
import React, { useEffect, useState } from 'react';
import { AnswerData } from 'redux/answer/answerslice';
import styled from 'styled-components';
import { MoveBtn } from '../../pages/QuestionBoardList';

export default function AnswerItem({ answer }: { answer: AnswerData }) {
  const [content, setContent] = useState<string>(answer.content);
  const { putAnswerData, deleteAnswerData } = useGetData();
  const deleteAnswer = (answerId: number | string) => {
    deleteAnswerData('questions', answerId).catch(console.error);
  };

  const [isEdit, setIsEdit] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    putAnswerData('questions', answer.answerId, content)
      .then((res) => {
        setIsEdit(!isEdit);
      })
      .catch(console.error);
  };
  useEffect(() => {
    console.log();
  }, [isEdit]);
  return (
    <li>
      {' '}
      {isEdit ? (
        <form onSubmit={handleSubmit}>
          <TextInput value={content} setState={setContent} type="answer" />
          <MoveBtn
            children="수정완료"
            // onClick={(e: React.FormEvent<HTMLFormElement>) => {
            //   e.preventDefault();
            //   putAnswerData('questions', answer.answerId, content).catch(console.error);
            //   setIsEdit(!isEdit);
            // }}
          />
        </form>
      ) : (
        <div>{content}</div>
      )}
      <Flex>
        <MoveBtn children="수정" onClick={() => setIsEdit(!isEdit)} />
        <MoveBtn children="삭제" onClick={() => deleteAnswer(answer.answerId)} />
      </Flex>
      <AnswerContent>{answer.likeCnt}</AnswerContent>
    </li>
  );
}

// const AnswerLi = styled.li`
//   padding: 20px;
//   border: 1px solid gray;
//   margin-bottom: 20px;
// `;

const AnswerContent = styled.div`
  margin-top: 10px;
`;
