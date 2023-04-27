import { Flex } from 'component/style/cssTemplete';
import {
  CategoryFilter,
  DescriptionFont,
  MoveBtn,
  Section,
  section,
  StyledCategoryBtn,
} from 'pages/question/QuestionBoardList';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BlogList from './BlogList.';
import { AiOutlineBulb } from 'react-icons/ai';
import { FaMicroblog } from 'react-icons/fa';
import { useAppSelector } from 'redux/hooks';
export default function BlogBoardList() {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();
  const { category } = useParams();
  const picture = useLocation().state;
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const location = useAppSelector((state) => state.persistReducer.userInfo.data.location);
  console.log(location);

  const handleClick = (section: string) => {
    setFilter(section);

    navigate(`/board/boardlist/${section}/${category}`);
  };

  // console.log(filter);
  useEffect(() => {
    //
  }, [filter]);
  return (
    <Flex direction="column" width="100%" height="900px">
      <div>{category}</div>
      <Section>
        {section.map((filter, idx) => (
          <StyledCategoryBtn
            key={idx}
            children={
              filter === 'blogs' ? (
                <CategoryFilter>
                  블로그
                  <AiOutlineBulb />
                </CategoryFilter>
              ) : (
                <CategoryFilter>
                  질문 <FaMicroblog />
                </CategoryFilter>
              )
            }
            onClick={() => {
              handleClick(filter);
            }}
            selected={filter === 'blogs'}
          />
        ))}
        {/* 검증된 사람들만 글 작성 가능 */}
        {location && category === location && (
          <PostBtn
            children="글 작성하기"
            onClick={() => {
              navigate(`/board/blogpost/${category}`);
            }}
          />
        )}
      </Section>

      <DescriptionFont>
        현지인들이 추천하는 여행지에 대한 게시물과 블로그를 작성할 수 있는 게시판입니다.(현지인인증시만 작성가능)
      </DescriptionFont>

      <BlogList filter={filter} />
    </Flex>
  );
}
const PostBtn = styled(MoveBtn)`
  top: 1em;
  right: 3em;
  width: 8rem;
  position: absolute;
  @media (max-width: 762px) {
    display: none;
  }
`;
