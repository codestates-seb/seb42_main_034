import { BoardData, useGetData } from 'api/data';

import { Flex } from 'component/style/cssTemplete';
import TextInput from 'component/ui/Input';
import useAPI from 'hooks/uesAPI';

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
  onAnswer,
  onDelete,
}: {
  questionId?: number | string | undefined;
  blogId?: number | string | undefined;
  answer: AnswerData;
  onAnswer: React.Dispatch<React.SetStateAction<[] | AnswerData[]>>;
  onDelete: (answerId: number | string) => void;
}) {
  const api = useAPI();
  const dispatch = useAppDispatch();
  const { deleteAnswerData, putAnswerData, getAnswerData } = useGetData();
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState<string>('');
  console.log(answer);

  useEffect(() => {
    // onAnswer(answer);
  }, [answer]);

  return (
    <AnswerWrapper>
      <AnswerContainer>
        <AnswerItem>
          <Flex>
            {isEdit ? (
              <form>
                <TextInput value={answer.content} setState={setContent} type="answer" />
                <MoveBtn
                  children="수정완료"
                  onClick={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    putAnswerData('questions', answer.answerId, content)
                      .then((res) => {
                        getAnswerData(questionId, 'questions', onAnswer).catch(console.error);
                        setIsEdit(false);
                      })
                      .catch(console.error);
                  }}
                />
              </form>
            ) : (
              <>
                <div>{answer.content}</div>
                <MoveBtn children="삭제" onClick={() => onDelete(answer.answerId)} />
                <MoveBtn
                  children="수정"
                  onClick={() => {
                    setIsEdit(!isEdit);
                  }}
                />
              </>
            )}
            <>{/* 같은 사람일때만 보이게 로직짜기 */}</>
          </Flex>

          <AnswerContent>{answer.likeCnt}</AnswerContent>
        </AnswerItem>
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
