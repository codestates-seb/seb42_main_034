import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { useMypageAPI } from 'api/mypage';
import { useAppSelector } from 'redux/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import useAPI from 'hooks/uesAPI';
import Page from 'component/Page';
import { Flex } from 'component/style/cssTemplete';
import { Divide } from './ListStyle';
interface Post {
  content: string;
  title: string;
  blogId: number;
}
const BlogsList = () => {
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const { getMyInfo } = useMypageAPI();
  const api = useAPI();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post[] | []>([]);
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });
  const getPost = async () => {
    await api
      .get(`/members/me/blogsTitle?page=${pageNation.page}&size=10`)
      .then((res) => res.data)
      .then((resp) => {
        setPost(resp.data);
        setPageNation(resp.pageInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPost();
  }, [pageNation.page]);

  const handleBlogClick = (blogId: any) => {
    navigate(`/board/blogsdetails/${blogId}`);
  };
  return (
    <MainContainer>
      <List>
        {post.length > 0 ? (
          post.map((p) => <Divide key={p.blogId} onClick={() => handleBlogClick(p.blogId)}></Divide>)
        ) : (
          <Flex width="100%" justify="center">
            작성한 블로그가 없습니다
          </Flex>
        )}
      </List>
      {pageNation && <Page pages={pageNation} onPage={setPageNation} />}
    </MainContainer>
  );
};
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  cursor: pointer;
`;
const List = styled.ul`
  height: 500px;
  width: 100%;
`;

export default BlogsList;
