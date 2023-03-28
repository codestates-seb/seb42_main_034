import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CRUDdata, ReturnData } from 'api/data';
import { Flex, HoverAction } from 'component/style/cssTemplete';
import { Button, IButtonProps } from 'component/ui/Button';
import QuestionCard from './QuestionCard';
import styled from 'styled-components';
import { Colors } from 'component/style/variables';
// import Searchbar from 'component/board/Searchbar';
import Page from 'component/Page';
export const StyledCategoryBtn = styled(Button)`
  background: none;
  font-size: 1.5rem;
  border: none;
  border-bottom: 7px solid ${Colors.button_blue};
  margin-top: 0;
  margin-right: 0.6rem;
  ${HoverAction}
`;
export default function BoardList() {
  const section: string[] = ['questions', 'blog'];
  const data = useLocation();

  const [filter, setFilter] = useState('questions');
  const {
    isLoading,
    error,
    data: city,
  } = useQuery([filter, 'region'] as const, async () => await new CRUDdata().getData('project', filter), {
    staleTime: 1000 * 15,
  }); //여기에 해당지역넣기
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
  });
  const handleClick = (section: string) => {
    setFilter(section);
  };
  useEffect(() => {
    console.log(city);
  }, [filter]);
  // 블로그 버튼을 누르면 해당 블로그로 데이터 get 함 -> 필터를 바꿔야 useEffect로 다시 받아올수있음
  return (
    <Flex direction="column" width="100%" height="900px">
      {/* <Searchbar /> */}
      <Flex items="center" justify="space-between">
        {city &&
          section.map((filter, idx) => (
            <StyledCategoryBtn
              key={idx}
              children={filter}
              onClick={() => {
                handleClick(filter);
              }}
            />
          ))}
      </Flex>
      <div>{filter === 'questions' ? '질문' : '블로그'}을(를) 작성하고 목록을 확인할수있는 곳 입니다</div>

      <MainBoard>
        {city?.data.map((city: ReturnData, idx: number) => (
          <QuestionCard key={idx} city={city} filter={filter} />
        ))}
      </MainBoard>
      <Page pages={pageNation} onPage={setPageNation} />
    </Flex>
  );
}
const MainBoard = styled.ul`
  flex: 1 1 auto;
`;
