import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BoardData, useGetData } from 'api/data';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'redux/hooks';
import Answer from 'component/question/Answer';
import { Flex } from 'component/style/cssTemplete';
import { MoveBtn } from 'pages/QuestionBoardList';
import BlogAnswer from '../component/blog/BlogAnswer';
import useAPI from 'hooks/uesAPI';
import BoardDetail from 'component/board/BoardDetail';

export default function BlogDetails() {
  const data: BoardData = useLocation().state;
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const blogId = Number(id);
  const api = useAPI();
  const { getBoardData } = useGetData();

  const {
    isLoading,
    error,
    data: detail,
  } = useQuery(['region', data] as const, async () => await getBoardData(blogId, 'blogs'), {

    staleTime: 1000 * 15,
  });

  const deleteBoardData = async () => {
    await api.delete(`/blogs/${blogId}`);
    navigate(-1);
  };

  return (
    <>
      <Flex justify="end" width="90%" gap="2rem">
        <>
          <MoveBtn
            children="수정"
            onClick={() => {
              navigate(`/board/modifyblog/${blogId}`, { state: { detail } });
            }}
          />
          <MoveBtn children="삭제" onClick={deleteBoardData} />
        </>
      </Flex>
      {isLoading && <div>로딩중..</div>}
      {detail && (
        <>
          <BoardDetail section="blogs" detail={detail} />
          <BlogAnswer blogId={blogId} />

        </>
      )}
    </>
  );
}
