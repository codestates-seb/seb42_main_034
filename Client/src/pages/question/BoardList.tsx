import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CRUDdata, ReturnData, useGetData } from 'api/data';
import { Flex, HoverAction, Relative } from 'component/style/cssTemplete';
import { Button, IButtonProps } from 'component/ui/Button';
import QuestionCard from './QuestionCard';
import styled from 'styled-components';
import { Colors } from 'component/style/variables';
import Searchbar from 'component/board/Searchbar';
import Page from 'component/Page';

import useAPI from 'hooks/uesAPI';
import { getEnvironmentData } from 'worker_threads';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ListData, setBoardDetails } from 'redux/boardDetails';

export default function BoardList() {
  const section: string[] = ['questions', 'blogs'];
  const data = useLocation();
  const api = useAPI();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.boardDetail);
  const [filter, setFilter] = useState('questions');
  // const {
  //   isLoading,
  //   error,
  //   data: city,
  // } = useQuery([filter, 'region'] as const, async () => await new CRUDdata().getData('project', filter), {
  //   staleTime: 1000 * 15,
  // }); //여기에 해당지역넣기
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });
  const handleClick = (section: string) => {
    setFilter(section);
  };
  useEffect(() => {
    const getData = async () => {
      const response = await api.get(filter, {
        params: {
          category: 'project',
          page: pageNation.page,
          sortedBy: 'default',
        },
      });
      dispatch(setBoardDetails(response.data));
    };
    setPageNation(city.pageInfo);
    getData().catch(console.error);
  }, [filter]);
  console.log(city);

  // 블로그 버튼을 누르면 해당 블로그로 데이터 get 함 -> 필터를 바꿔야 useEffect로 다시 받아올수있음
  return (
    <Flex direction="column" width="100%" height="900px">
      <Relative>
        {city &&
          section.map((filter, idx) => (
            <StyledCategoryBtn
              key={idx}
              children={filter === 'blogs' ? '블로그' : '질문'}
              onClick={() => {
                handleClick(filter);
              }}
            />
          ))}
        <PostBtn
          children="글 작성하기"
          onClick={() => {
            navigate('/board/questionpost');
          }}
        />
      </Relative>

      <div>{filter === 'questions' ? '질문' : '블로그'}을(를) 작성하고 목록을 확인할수있는 곳 입니다</div>
      <MainBoard>
        {city && city.data.map((city: ListData, idx: number) => <QuestionCard key={idx} city={city} filter={filter} />)}
      </MainBoard>
      <Page pages={pageNation} onPage={setPageNation} />
    </Flex>
  );
}
const MainBoard = styled.ul`
  flex: 1 1 auto;
`;
export const MoveBtn = styled(Button)<{ width?: string; height?: string; display?: string }>`
  background: ${Colors.button_blue};
  width: ${(props) => props.width};
  display: ${(props) => props.display};
  height: ${(props) => props.height};
  font-size: 1rem;
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
export const StyledCategoryBtn = styled(Button)`
  background: none;
  font-size: 2rem;
  margin: 0.7rem;
  border: none;
  border-bottom: 7px solid ${Colors.button_blue};
  margin-top: 0;
  margin-right: 0.6rem;
  ${HoverAction}
`;
