import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BoardDetail from '../../component/board/BoardDetail';

import { BoardData, CRUDdata, getFilterData, useGetData } from 'api/data';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'redux/hooks';

import Answer from 'component/Answer';

import { Flex } from 'component/style/cssTemplete';
import { MoveBtn } from 'pages/question/BoardList';
export default function BlogDetails() {
  const data: BoardData = useLocation().state;
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();
  const { deleteBoardData } = useGetData();
  const { getBoardData, getAnswerData } = useGetData();
  const isFiltered = getFilterData();
  const {
    isLoading,
    error,
    data: detail,
  } = useQuery(['region', data] as const, async () => await getBoardData(data.blogId, isFiltered), {
    staleTime: 1000 * 15,
  });

  return (
    <>
      <Flex justify="end" width="90%" gap="2rem">
        <MoveBtn
          children="수정"
          onClick={() => {
            navigate(`/board/modify/${data.blogId}`, { state: { data, detail } });
          }}
        />
        <MoveBtn
          children="삭제"
          onClick={() => {
            deleteBoardData(data.blogId, memberId, isFiltered)
              .then((res) => {
                navigate(-1);
              })
              .catch(console.error);
          }}
        />
      </Flex>
      {isLoading && <div>로딩중..</div>}
      {data && detail && (
        <>
          <BoardDetail data={data} detail={detail} />
          <Answer questionId={data.blogId} />
        </>
      )}
    </>
  );
}
