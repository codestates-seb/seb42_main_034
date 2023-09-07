import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, HoverAction, Relative } from 'component/style/cssTemplete';
import { Button } from 'component/ui/Button';
import styled from 'styled-components';
import { Colors, FontSize } from 'component/style/variables';
import QuestionList from '../component/question/QuestionList';
import CategotyFilter from 'component/board/CategotyFilter';

const QuestionCarousel = lazy(() => import('component/question/QuestionCarousel'));
export const StyledCategoryBtn = styled(Button)<{ selected?: boolean }>`
  font-size: ${FontSize.h3};
  margin: 0.7rem;
  border: none;
  background: ${(props) => (props.selected ? Colors.button_blue : 'none')};
  margin-top: 0;
  border-radius: 0.4rem;
  margin-right: 0.6rem;
  color: ${(props) => props.selected && Colors.text_white};
  ${HoverAction}
`;
export const Section = styled(Relative)`
  display: flex;
  justify-content: center;
`;

export const DescriptionFont = styled.div`
  padding: 0.3em;
  color: ${Colors.text_grey};
  font-size: ${FontSize.sm};
`;
export const CategoryFilter = styled.div`
  @media (max-width: 762px) {
    font-size: ${FontSize.lg};
  }
`;
export const MoveBtn = styled(Button)<{ width?: string; height?: string; display?: string }>`
  background: ${Colors.button_blue};
  width: ${(props) => props.width};
  display: ${(props) => props.display};
  height: ${(props) => props.height};
  font-size: ${FontSize.sm};
  ${HoverAction}
  border: none;
  margin: 1rem;
  border-radius: 1rem;
  color: ${Colors.text_white};
`;
export default function QuestionBoardList() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [filter, setFilter] = useState('questions');
  const handleClick = (section: string) => {
    setFilter(section);
    navigate(`/board/boardlist/${section}/${category}`);
  };

  useEffect(() => {
    //
  }, [filter]);
  return (
    <>
      {' '}
      <Suspense fallback={<div>로딩중..</div>}>
        <QuestionCarousel />
      </Suspense>
      <Flex direction="column" width="100%">
        <City>
          {category}
          <House src={`/image/home.gif`} />
        </City>

        <CategotyFilter onClick={handleClick} filter={filter} />
        <DescriptionFont>질문을 작성하고 목록을 확인할수있는 곳 입니다</DescriptionFont>
        <DescriptionFont>음식점, 명소등 마음껏 질문해주세요</DescriptionFont>
        <PostBtnContainer>
          {' '}
          <PostBtn
            children="글 작성하기"
            onClick={() => {
              navigate(`/board/questionspost/${category}`);
            }}
          />
        </PostBtnContainer>
        <QuestionList filter={filter} />
      </Flex>
    </>
  );
}

const PostBtn = styled(MoveBtn)`
  width: 7rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  @media (max-width: 762px) {
    display: none;
  }
`;
const City = styled.div`
  text-align: center;
  font-size: ${FontSize.h3};
  border-bottom: 2px solid skyblue;
  margin-bottom: 2rem;
`;
const PostBtnContainer = styled.div`
  text-align: end;
`;
const House = styled.img`
  width: 2rem;
  height: 2rem;
`;
