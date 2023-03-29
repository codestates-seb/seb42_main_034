import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BoardDetail from '../../component/board/BoardDetail';

import { BoardData, CRUDdata, useGetData } from 'api/data';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'redux/hooks';

import Answer from 'component/Answer';
import { MoveBtn } from './BoardList';
import { Flex } from 'component/style/cssTemplete';
export default function QuestionDetails() {
  const data: BoardData = useLocation().state;
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();
  const { deleteBoardData } = useGetData();

  console.log(memberId);

  return (
    <>
      <Flex justify="end" width="90%" gap="2rem">
        <MoveBtn
          children="수정"
          onClick={() => {
            navigate(`/board/putboard/${data.questionId}`, { state: data.questionId });
          }}
        />
        <MoveBtn
          children="삭제"
          onClick={() => {
            deleteBoardData(data.questionId, memberId).catch(console.error);
          }}
        />
      </Flex>
      <BoardDetail data={data} />
      <Answer questionId={data.questionId} />
    </>
  );
}
