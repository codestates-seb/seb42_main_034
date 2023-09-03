import { Flex } from 'component/style/cssTemplete';
import { CategoryFilter, DescriptionFont, Section, StyledCategoryBtn } from 'pages/QuestionBoardList';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BlogList from '../component/blog/BlogList.';
import { AiOutlineBulb } from 'react-icons/ai';
import { FaMicroblog } from 'react-icons/fa';
import { useAppSelector } from 'redux/hooks';
import { Button } from 'component/ui/Button';
import { Colors } from 'component/style/variables';
import CategotyFilter from 'component/board/CategotyFilter';
export default function BlogBoardList() {
  const [filter, setFilter] = useState('blogs');
  const navigate = useNavigate();
  const { category } = useParams();
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const location = useAppSelector((state) => state.persistReducer.userInfo);
  const handleClick = (section: string) => {
    setFilter(section);
    navigate(`/board/boardlist/${section}/${category}`);
  };
  const handlePostClick = () => {
    if (location?.location && category === location?.location) {
      navigate(`/board/blogpost/${category}`);
    } else {
      alert('현지인만 작성가능합니다. 현지인 인증을 해주세요');
      navigate(`/board/mypage/${memberId}`);
    }
  };
  useEffect(() => {
    //;
  }, [filter]);
  return (
    <Flex direction="column" width="100%">
      <div>{category}</div>
      <CategotyFilter onClick={handleClick} filter={filter} />
      <PostBtn children="글 작성하기" onClick={handlePostClick} />
      <DescriptionFont>
        현지인들이 추천하는 여행지에 대한 게시물과 블로그를 작성할 수 있는 게시판입니다.(현지인인증시만 작성가능)
      </DescriptionFont>
      <BlogList filter={filter} />
    </Flex>
  );
}
const PostBtn = styled(Button)`
  top: 1em;
  right: 3em;
  width: 8rem;
  height: 3rem;
  border-radius: 0.2em;
  background: ${Colors.button_blue};
  position: absolute;
  &:hover {
    background: ${Colors.button_clicked};
  }
  @media (max-width: 762px) {
    display: none;
  }
`;
