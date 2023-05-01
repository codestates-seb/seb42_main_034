import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useMypageAPI } from "api/mypage";
import { useAppSelector } from "redux/hooks";
import { useParams, useNavigate } from "react-router-dom";
import useAPI from "hooks/uesAPI";


interface Post {
  content: string;
  title: string;
  id : number;
}

const PostList = () => {
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const { getMyInfo } = useMypageAPI();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMyInfo(memberId),
    retry: false,
  });
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
    .get(`/members/me/questionsTitle?page=${pageNation.page}&size=10`)  // 이 부분 api 필요함
    .then((resp) => {
      setPost(resp.data.data.map((p: Post) => ({ ...p, id: p.id })));
    })
    .catch((error) => {
      console.log(error);
    });
  }


  useEffect(() => {
    getPost();
  }, [memberId, pageNation.page]);

  const handlePostClick = (postId: number) => {
    navigate(`/board/questionsdetails/${postId}`);
  };

                            
  return (
    <MainContainer>
      {post.length > 0 ? (
        post.map((p) => (
          <Divide key={p.id} onClick={() => handlePostClick(p.id)}>
            <p>{p.title ?? "작성한 질문이 없습니다"}</p>  
          </Divide>
        ))
      ) : (
        <p>작성한 질문 글이 없습니다</p>
      )}
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
  &:hover {
    background: #0583c6;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #0583c6, 0 0 25px #0583c6, 0 0 50px #0583c6, 0 0 100px #0583c6;
    border-radius: 18px;
  }
`;

const Divide = styled.div`
  padding: 3px 0;
  width: 100%;
  height: 2rem;
  align-items: center;
  display: flex;
  justify-content: center;
  border: solid 2px skyblue;
  border-bottom: 3px solid skyblue;
  border-radius: 18px;
`

export default PostList;
