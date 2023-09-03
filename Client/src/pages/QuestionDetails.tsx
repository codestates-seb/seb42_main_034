import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BoardDetail from '../component/board/BoardDetail';
import { FaArrowLeft } from 'react-icons/fa';
import { BoardData, getFilterData, useGetData } from 'api/data';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'redux/hooks';

import Answer from 'component/question/Answer';
import { MoveBtn } from './QuestionBoardList';
import { Flex, HoverAction } from 'component/style/cssTemplete';
import styled from 'styled-components';
import { FontSize } from 'component/style/variables';
import { Button } from 'component/ui/Button';
import BackBtn from 'component/ui/BackBtn';

export default function QuestionDetails() {
  const data: BoardData = useLocation().state;
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const { deleteBoardData } = useGetData();
  const region = getFilterData();
  const { id } = useParams() as { id: string };
  const questionId = Number(id);
  const navigate = useNavigate();
  const { getBoardData, getAnswerData } = useGetData();
  const {
    isLoading,
    error,
    data: detail,
  } = useQuery(['region', data] as const, async () => await getBoardData(questionId, 'questions'), {
    staleTime: 1000 * 15,
  });

  return (
    <>
      {' '}
      <BackBtn />
      <Question>
        <BulbIcon src={`/image/bulb.png`} />
        <span> {`질문 > ${region}`}</span>
      </Question>
      {detail && detail.memberId === memberId && (
        <Flex justify="end" width="90%" gap="2rem">
          <MoveBtn
            children="수정"
            onClick={() => {
              navigate(`/board/modifyquestion/${questionId}`, { state: { detail } });
            }}
          />
          <MoveBtn
            children="삭제"
            onClick={() => {
              deleteBoardData(questionId, memberId, 'questions')
                .then((res) => {
                  navigate(-1);
                })
                .catch(console.error);
            }}
          />
        </Flex>
      )}
      {isLoading && <div>로딩중..</div>}
      {detail && (
        <>
          <BoardDetail detail={detail} section="questions" />
          <Answer questionId={questionId} writerId={detail.memberId} />
        </>
      )}
    </>
  );
}
const BulbIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;
const Question = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px dotted skyblue;
  padding: 0.5rem;
  border-radius: 0.5rem;
  text-align: start;
  width: 100%;
  justify-content: start;
`;
