import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useMypageAPI } from "api/mypage";
import { useAppSelector } from "redux/hooks";
import { useParams } from "react-router-dom";
import useAPI from "hooks/uesAPI";


interface Post {
  content: string;
  title: string;
  id : number;
}


const BlogsList = () => {
  const { id } = useAppSelector((state) => state.loginInfo);
  const { getMyInfo } = useMypageAPI();
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMyInfo(id),
    retry: false,
  });
 const api = useAPI();

  const { memberId} = useParams();
  const [post, setPost] = useState<Post[]|[]>([]); 
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });
  const getPost = async () => {
    await api
    .get(`/members/me/blogsTitle?page=${pageNation.page}&size=10`)
    .then(resp => {
      setPost(resp.data.data);
    })
    .catch(error => {
      console.log(error);
    }) 
  }

  useEffect(() => {
    getPost();
  }, [memberId,pageNation.page])


console.log(post)                               

  return (
    <MainContainer>
      {post.map((p) => (
      <Divide key={p.id}>
        <p>{p.title ?? '작성한 블로그 글이 없습니다'}</p>
      </Divide>
    ))}
   {/* {pageNation && <Page pages={pageNation} onPage={setPageNation} />} */}
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
`;

const Divide = styled.div`
  padding: 3px 0;
  width: 100%;
  border-bottom: 3px solid skyblue;
  align-items: center;
  display: flex;
  justify-content: center;
`

export default BlogsList;
