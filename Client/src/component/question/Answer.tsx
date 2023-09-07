import useAddTodoMutation, { getFilterData, useGetData, useLike } from 'api/data';
import { MoveBtn } from 'pages/QuestionBoardList';
import React, { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import AnswerList from '../board/AnswerList';
import { Flex } from '../style/cssTemplete';
import TextInput from '../ui/Input';
import { AnswerData, getAnswerLike, getAnswersData } from 'redux/answer/answerslice';
import useAPI from 'hooks/uesAPI';
import Page from '../Page';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Colors } from 'component/style/variables';

export interface answerReturn {
  questionId: number | string;
  content: string;
  title: string;
  tag: string;
  writer: string;
  createdAt: string;
}

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
  const queryClient = useQueryClient();
  // const { region } = useParams();
  const { setLike, seletedQuestion } = useLike();
  const { memberId } = useAppSelector((state) => state.loginInfo);
  //위치검증
  const location = useAppSelector((state) => state.persistReducer.userInfo);
  const region = getFilterData();
  const { mutateAsync } = useAddTodoMutation();

  const [answer, setAnswer] = useState<AnswerData[] | []>([]);
  const { putAnswerData } = useGetData();
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });
  console.log(answer);

  const getAnswer = async () => {
    const response = await api.get(`questions/answer/${questionId}?page=1&sortedBy=hot`);
    setAnswer(response.data.data);
    dispatch(getAnswersData({ answers: response.data.data }));
    console.log(response);
  };
  const deleteAnswer = useCallback(
    (answerId: number | string) => {
      deleteAnswerData('questions', answerId)
        .then((res) => {
          console.log('질문댓글성공');

          getAnswerData(questionId, 'questions', setAnswer).catch(console.error);
        })
        .catch((error) => {
          console.log('질문댓글에러');
        });
    },
    [answer],
  );
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (location?.location && region === location?.location) {
    await api
      .post(`/questions/answer/${questionId}`, { content, memberId })
      .then((res) => {
        getAnswer().catch(console.error);
      })
      .catch(console.error);
    //  else {
    // alert('현지인만 작성 가능합니다');
    // }
  };

  const handleLike = useCallback(
    (isLike: boolean, answerId: number, setState: (value: React.SetStateAction<boolean>) => void) => {
      if (isLike === false) {
        //해당 answer만 바꾸기

        setState(!isLike);
        mutateAsync(answerId);
      } else {
        setAnswer(
          answer.map((answer) => (answer.answerId === answerId ? { ...answer, likeCnt: answer.likeCnt - 1 } : answer)),
          //좋아요상태 넣기
        );
        //성공했을때 상태바꿈
        setState(!isLike);
      }
    },
    [answer],
  );
  //채택
  const setChecked = (answerId: number) => {
    seletedQuestion(answerId).then((res) => dispatch(getAnswerLike({ answer })));
  };
  useEffect(() => {
    getAnswer().catch(console.error);
    // dispatch(getAnswerLike({ answer }));
  }, []); //

  return (
    <>
      <AnswerWrapper>
        {answer && (
          <>
            <StyledForm onSubmit={submitHandler}>
              <StyledInput type="text" placeholder="댓글을 입력해주세요" setState={setComment} />
              <SubmitBtn children="작성" />
              {/* 추후에 위치정보도 함께 첨부  */}
            </StyledForm>
          </>
        )}

        {answer && answer.length > 0 ? (
          <AnswerCount> 💬{answer.length}개의 답변 </AnswerCount>
        ) : (
          <AnswerCount>💬답변이 없습니다</AnswerCount>
        )}

        {answer &&
          answer.map((answer) => (
            <AnswerList
              key={answer.answerId}
              questionId={questionId}
              answer={answer}
              onAnswer={setAnswer}
              onDelete={deleteAnswer}
              writerId={writerId}
              onLike={handleLike}
              getAnswer={getAnswer}
            />
          ))}
      </AnswerWrapper>
      {pageNation && <Page pages={pageNation} onPage={setPageNation} />}
    </>
  );
}

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  align-items: end;
  flex-direction: column;
`;
const StyledInput = styled(TextInput)`
  height: 7rem;
  width: 100%;
  border-radius: 0.7rem;
  &:focus-within {
    border-color: ${Colors.main_01};
  }
`;
const AnswerWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  min-height: 30rem;
`;
const AnswerCount = styled.h3`
  color: ${Colors.main_03};
`;
const SubmitBtn = styled(MoveBtn)`
  width: 10rem;
  height: 3rem;
  margin-right: 0;
`;
