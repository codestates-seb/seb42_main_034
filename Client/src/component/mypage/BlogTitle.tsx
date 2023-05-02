import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Blogs {
  content: string;
  title: string;
  id : number;
}


const BlogTitle = (blog: Blogs) => { 
const navigate = useNavigate();


  const handlePostClick = () => {
    navigate(`/blogs/`);
    //    navigate(/board/blogsdetails/${blogId});
  };
              

    return (
        <TitleList onClick={handlePostClick}>
        <div>hi</div>
        
        
        </TitleList>
    )
}


export default BlogTitle;


const TitleList = styled.li`
  background: skyblue;
  margin: 2rem;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem;
  height: 5rem;
  border-radius: 1rem;
  padding: 1rem;
  &:hover {
    cursor: pointer;
  }
  .title {
    font-weight: bold;
    font-size: 2rem;
  }
`;
