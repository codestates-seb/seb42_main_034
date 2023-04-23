import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getFilterData, ReturnData } from 'api/data';
import { Flex, HoverAction, Relative } from 'component/style/cssTemplete';
import { Button } from 'component/ui/Button';
import styled from 'styled-components';
import { Colors, FontSize } from 'component/style/variables';
import useAPI from 'hooks/uesAPI';
import { useAppDispatch } from 'redux/hooks';
import QuestionList from './QuestionList';
import Searchbar from 'component/board/Searchbar';
export const section: string[] = ['questions', 'blogs'];
export default function QuestionBoardList() {
  const id = useParams();

  const navigate = useNavigate();
  const localFilter = getFilterData();

  const { category } = useParams();

  // const city = useAppSelector((state) => state.boardDetail);
  const [filter, setFilter] = useState('questions');
  // const {
  //   isLoading,
  //   error,
  //   data: city,
  // } = useQuery([filter, 'region'] as const, async () => await new CRUDdata().getData('project', filter), {
  //   staleTime: 1000 * 15,
  // }); //여기에 해당지역넣기

  console.log(section);

  const handleClick = (section: string) => {
    setFilter(section);
    navigate(`/board/boardlist/${section}/${category}`);

    // localStorage.setItem('filter', JSON.stringify(data));
  };

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
            selected={filter === 'questions'}
          />
        ))}
        <PostBtn
          children="글 작성하기"
          onClick={() => {
            navigate(`/board/questionspost/${category}`);
          }}
        />
      </Section>

      <DescriptionFont>질문을 작성하고 목록을 확인할수있는 곳 입니다</DescriptionFont>

      <QuestionList filter={filter} />
    </Flex>
  );
}
export const MoveBtn = styled(Button)<{ width?: string; height?: string; display?: string }>`
  background: ${Colors.button_blue};
  width: ${(props) => props.width};
  display: ${(props) => props.display};
  height: ${(props) => props.height};
  font-size: ${FontSize.sm};
  ${HoverAction}
  margin: 1rem;
  border-radius: 1rem;
`;
const PostBtn = styled(MoveBtn)`
  top: 1em;
  right: 3em;
  width: 8rem;
  position: absolute;
`;
export const StyledCategoryBtn = styled(Button)<{ selected?: boolean }>`
  background: none;
  font-size: ${FontSize.h3};
  margin: 0.7rem;
  border: none;
  border-bottom: 7px solid ${Colors.button_blue};
  margin-top: 0;
  margin-right: 0.6rem;
  color: ${(props) => props.selected && Colors.button_blue};
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
