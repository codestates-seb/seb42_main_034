import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BoardDetail from '../../component/board/BoardDetail';

import { BoardData, CRUDdata, getFilterData, useGetData } from 'api/data';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'redux/hooks';

import Answer from 'component/Answer';

import { Flex } from 'component/style/cssTemplete';
import { MoveBtn } from 'pages/question/QuestionBoardList';
import BlogAnswer from './BlogAnswer';
import useAPI from 'hooks/uesAPI';
export default function BlogDetails() {
  const data: BoardData = useLocation().state;
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();
  const api = useAPI();
  const { getBoardData } = useGetData();
  const isFiltered = getFilterData();
  const {
    isLoading,
    error,
    data: detail,
  } = useQuery(['region', data] as const, async () => await getBoardData(data.blogId, 'blogs'), {
    staleTime: 1000 * 15,
  });
  const deleteBoardData = async () => {
    await api.delete(`/blogs/${data.blogId}`);
    navigate(-1);
  };

  return (
    <>
      <Flex justify="end" width="90%" gap="2rem">
        <MoveBtn
          children="수정"
          onClick={() => {
            navigate(`/board/modifyblog/${data.blogId}`, { state: { data, detail } });
          }}
        />
        <MoveBtn children="삭제" onClick={deleteBoardData} />
      </Flex>
      {isLoading && <div>로딩중..</div>}
      {data && detail && (
        <>
          <BoardDetail section="blogs" data={data} detail={detail} />
          <BlogAnswer blogId={data.blogId} />
        </>
      )}
    </>
  );
}
