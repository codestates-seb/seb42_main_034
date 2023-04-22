import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useMypageAPI } from "api/mypage";
import { useAppSelector } from "redux/hooks";
import { useParams } from "react-router-dom";
import AxiosCustom from "utils/AxiosCustom";
import useAPI from "hooks/uesAPI";
import Page from "component/Page";
interface Post {
  content: string;
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
// console.log(data)
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
      
console.log(resp)
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
      {data?.nickname}
      {data?.comments}
      {data?.email}
      {post.map((p) => (
      <div key={p.id}>
        <p>{p.content}</p>
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
  border: 2px solid red;
`;

export default PostList;
