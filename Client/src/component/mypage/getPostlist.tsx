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


const PostList = () => {
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
    .get(`/members/me/questionsTitle?page=${pageNation.page}&size=10`)
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
      <div key={p.id}>
        <p>{p.title}</p>
      </div>
    ))}
   {/* {pageNation && <Page pages={pageNation} onPage={setPageNation} />} */}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid red;
`;

export default PostList;
