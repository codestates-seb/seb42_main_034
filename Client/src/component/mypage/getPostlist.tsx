import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMypageAPI } from 'api/mypage';
import { useAppSelector } from 'redux/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import useAPI from 'hooks/uesAPI';
import Page from 'component/Page';
import { ReturnData } from 'api/data';

interface Post {
  content: string;
  title: string;
  questionId: number;
}
interface PostData {
  data: ReturnData;
}
const PostList = () => {
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();
  const api = useAPI();
  const [post, setPost] = useState<Post[] | []>([]);
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });
  const getPost = async () => {
    await api
      .get(`/members/me/questionsTitle?page=${pageNation.page}&size=10`)
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
  }, [memberId, pageNation.page]);
  const handlePostClick = (postId: any) => {
    navigate(`/board/questionsdetails/${postId}`);
  };
  return (
    <MainContainer>
      {post.map((p) => (
        <Divide key={p.questionId} onClick={() => handlePostClick(p.questionId)}>
          <p>{p.title ?? '작성한 질문이 없습니다'}</p>
        </Divide>
      ))}
      {pageNation && <Page pages={pageNation} onPage={setPageNation} />}
    </MainContainer>
  );
};
const MainContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  cursor: pointer;
`;
const Divide = styled.div`
  padding: 3px 0;
  width: 100%;
  border-bottom: 3px solid skyblue;
  align-items: center;
  display: flex;
  justify-content: center;
`;
export default PostList;
