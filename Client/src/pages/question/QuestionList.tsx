import React, { useEffect, useState } from 'react';
import BoardList from '../../component/board/BoardList';
import Searchbar from '../../component/board/Searchbar';
import { Link, Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import SearchFilter from '../../component/board/SearchFilter';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { CRUDdata } from 'api/data';
import { Flex } from 'component/style/cssTemplete';
import { Button } from 'component/ui/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const WrapperMain = styled.div`
  margin-top: 50px;
`;

const SearchMenu = styled.div`
  display: flex;
  align-items: center;
`;

const SearchbarWrapper = styled.div`
  margin-right: 1rem;
`;

const SearchFilterWrapper = styled.div`
  margin-left: auto;
`;

export default function QuestionList() {
  const section: string[] = ['questions', 'blog'];
  const data = useLocation();
  console.log(data);
  const [filter, setFilter] = useState('questions');
  const {
    isLoading,
    error,
    data: city,
  } = useQuery([filter], async () => await new CRUDdata().getData(data.state, filter)); //여기에 해당지역넣기

  const navigate = useNavigate();
  const handleClick = (section: string) => {
    setFilter(section);
  };
  useEffect(() => {
    console.log(city);
  }, [filter]);
  // 블로그 버튼을 누르면 해당 블로그로 데이터 get 함 -> 필터를 바꿔야 useEffect로 다시 받아올수있음
  return (
    <Flex direction="coloum">
      {city &&
        section.map((filter, idx) => (
          <Button
            key={idx}
            children={filter}
            onClick={() => {
              handleClick(filter);
            }}
          />
        ))}
      <div>{filter}</div>
    </Flex>
  );
}
