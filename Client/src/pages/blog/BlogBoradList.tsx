import Searchbar from 'component/board/Searchbar';
import { Flex, Relative } from 'component/style/cssTemplete';
import { Button } from 'component/ui/Button';
import { DescriptionFont, MoveBtn, Section, section, StyledCategoryBtn } from 'pages/question/QuestionBoardList';
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BlogList from './BlogList.';

export default function BlogBoardList() {
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();
  const { category } = useParams();
  const handleClick = (section: string) => {
    setFilter(section);

    navigate(`/board/boardlist/${section}/${category}`);
  };
  console.log(filter);
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
            children={filter === 'blogs' ? '블로그' : '질문'}
            onClick={() => {
              handleClick(filter);
            }}
            selected={filter === 'blogs'}
          />
        ))}
        <PostBtn
          children="글 작성하기"
          onClick={() => {
            navigate(`/board/blogpost/${category}`);
          }}
        />
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
`;
