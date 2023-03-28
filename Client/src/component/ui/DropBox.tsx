import React, { useEffect, useState } from 'react';
import BoardList from '../../component/board/BoardList';
import Searchbar from '../../component/board/Searchbar';
import { Link, Outlet, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchFilter from '../../component/board/SearchFilter';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { CRUDdata } from 'api/data';
import { Flex } from 'component/style/cssTemplete';
import { Button } from 'component/ui/Button';
export default function DropBox() {
  const tab: string[] = ['questions', 'blog'];
  const data = useLocation();
  const { section } = useParams() as { section: string };
  console.log(data);
  console.log(section);

  const [filter, setFilter] = useState('questions');
  const {
    isLoading,
    error,
    data: city,
  } = useQuery([filter], async () => await new CRUDdata().getData(data.state, filter)); //여기에 해당지역넣기

  const navigate = useNavigate();
  const handleClick = (category: string) => {
    console.log(category);

    setFilter(category);
    navigate(`/board/list/${category}`);
  };
  useEffect(() => {
    console.log(city);
  }, [filter]);
  // 블로그 버튼을 누르면 해당 블로그로 데이터 get 함 -> 필터를 바꿔야 useEffect로 다시 받아올수있음
  return (
    <Flex direction="coloum">
      {city &&
        tab.map((filter, idx) => (
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
