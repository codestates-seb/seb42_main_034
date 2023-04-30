import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useMypageAPI } from "api/mypage";
import { useAppSelector } from "redux/hooks";
import { useNavigate } from "react-router-dom";
import useAPI from "hooks/uesAPI";
import BlogTitle from "./BlogTitle";


interface Blogs {
  blogId: number;
  content: string;
  title: string;
  id : number;
}

const BlogsList = () => {
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const { getMyInfo } = useMypageAPI();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMyInfo(memberId),
    retry: false,
  });

  const api = useAPI();

  const [post, setPost] = useState<Blogs[] | []>([]);
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });

  const getBlog = async () => {
    await api
      .get(`/members/me/blogsTitle?page=${pageNation.page}&size=10`)
      .then((resp) => {
        setPost(resp.data.data.map((p: Blogs) => ({ ...p, id: p.blogId ?? p.id}))); 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBlog();
  }, [memberId, pageNation.page]);

  const handleBlogClick = (blogId: number) => {
    const clickedBlog = post.find((p) => p.blogId === blogId);
    console.log(blogId)
    if(clickedBlog){
    navigate(`/board/blogsdetails/${blogId}`);
    }
  };


  return (
    <MainContainer>
      {post.length > 0 ? (
        post.map((p) => (
          <Divide key={p.id} onClick={() => handleBlogClick(p.blogId)}>
            <p>{p.title ?? "작성한 질문이 없습니다"}</p>
          </Divide>
        ))
      ) : (
        <p>작성한 블로그 글이 없습니다</p>
      )}
    </MainContainer>
  );
};


const MainContainer = styled.div`
  border: solid 1px red;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Divide = styled.div`
  border: solid 1px blue;
  padding: 3px 0;
  width: 100%;
  border-bottom: 3px solid skyblue;
  align-items: center;
  display: flex;
  justify-content: center;
`

export default BlogsList;