import { useGetData } from 'api/data';
import { MoveBtn } from 'pages/question/QuestionBoardList';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import AnswerList from './board/AnswerList';
import { Flex } from './style/cssTemplete';
import TextInput from './ui/Input';
import { AnswerData, getAnswerData, postAnswerData } from 'redux/answer/answerslice';
import useAPI from 'hooks/uesAPI';
import Page from './Page';
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
export default function Answer({
  questionId,
  writerId,
}: {
  questionId: number | string | undefined;
  writerId: number;
}) {
  const [content, setComment] = useState<string>('');

  const { deleteAnswerData, getAnswerData } = useGetData(); // data.ts에서 정리할것
  const dispatch = useAppDispatch();
  const api = useAPI();
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const [answer, setAnswer] = useState<AnswerData[] | []>([]);

  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });
  const getAnswer = async () => {
    const response = await api.get(`questions/answer/${questionId}?page=1&sortedBy=hot`);
    setAnswer(response.data.data);
  };
  const deleteAnswer = (answerId: number | string) => {
    deleteAnswerData('questions', answerId)
      .then((res) => {
        getAnswerData(questionId, 'questions', setAnswer).catch(console.error);
      })
      .catch(console.error);
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // postAnswerData(questionId, { content, memberId }).catch(console.log);

    await api.post(`/questions/answer/${questionId}`, { content, memberId }).catch(console.error);
    // dispatch(postAnswerData(response.data));

    // getAnswer().catch(console.error); //이게 최선은 아닐텐데...ㅎㅎ 리팩토링 필수
  };

  useEffect(() => {
    getAnswer().catch(console.error);
  }, []); //

  return (
    <AnswerWrapper>
      {answer && (
        <>
          <p>댓글 작성</p>
          <StyledForm onSubmit={submitHandler}>
            <StyledInput type="text" placeholder="댓글을 입력해주세요" setState={setComment} />
            <MoveBtn children="작성" />
            {/* 추후에 위치정보도 함께 첨부  */}
          </StyledForm>
          <h3>답변내용 ( 답변 수 : {answer.length} )</h3>
          {answer &&
            answer.map((answer) => (
              <AnswerList
                questionId={questionId}
                answer={answer}
                onAnswer={setAnswer}
                onDelete={deleteAnswer}
                writerId={writerId}
              />
            ))}
          {pageNation && <Page pages={pageNation} onPage={setPageNation} />}
        </>
      )}
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
  width: 80%;
`;
