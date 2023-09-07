import React from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { BoardData, getFilterData, useGetData } from 'api/data';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from 'redux/hooks';
import { BsFillMotherboardFill } from 'react-icons/bs';
import { Flex } from 'component/style/cssTemplete';
import { MoveBtn } from 'pages/QuestionBoardList';
import BlogAnswer from '../component/blog/BlogAnswer';
import useAPI from 'hooks/uesAPI';
import BoardDetail from 'component/board/BoardDetail';
import BlogBoard from 'component/blog/BlogBoard';
import styled from 'styled-components';

export default function BlogDetails() {
  const data: BoardData = useLocation().state;
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const blogId = Number(id);
  const api = useAPI();
  const { getBoardData } = useGetData();
  const region = getFilterData();
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
      <TopConTainer>
        <BsFillMotherboardFill />
        <span> {`블로그 > ${region}`}</span>
      </TopConTainer>

      <Flex justify="end" width="90%" gap="2rem">
        {detail && memberId === detail.memberId && (
          <>
            <BlogEditBtn
              children="수정"
              onClick={() => {
                navigate(`/board/modifyblog/${blogId}`, { state: { detail } });
              }}
            />
            <BlogDeleteBtn children="삭제" onClick={deleteBoardData} />{' '}
          </>
        )}
      </Flex>
      {isLoading && <div>로딩중..</div>}
      {detail && (
        <>
          <BlogBoard section="blogs" detail={detail} />
          <BlogAnswer blogId={blogId} />
        </>
      )}
    </>
  );
}
const BlogEditBtn = styled(MoveBtn)`
  width: 5rem;
  height: 2rem;
  border-radius: 0.6rem;
  font-size: medium;
`;
const BlogDeleteBtn = styled(MoveBtn)`
  width: 5rem;
  height: 2rem;
  border-radius: 0.6rem;
  font-size: medium;
  background: orangered;
`;
const TopConTainer = styled.h2`
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
