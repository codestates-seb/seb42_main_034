import { Flex } from 'component/style/cssTemplete';
import { Colors, FontSize } from 'component/style/variables';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BlogData, ListData } from 'redux/boardDetails';
import styled from 'styled-components';
import dayjs from 'dayjs';


export default function BlogCard({ city }: { city: BlogData }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/board/blogsdetails/${city.blogId}`, { state: city });
  };

  return (
    <Card onClick={handleClick}>
      <div>{city && city.tags.map((tag, idx) => <div key={idx}>#{tag}</div>)}</div>
      <div className="title">{city.title}</div>

      <Flex gap="2rem" direction="column">
        <div>{dayjs(city.createdAt).format('YYYY-MM-DD')}</div>
        <div>{city.writer}</div>
      </Flex>
    </Card>
  );
}




const Card = styled.li`
  background: ${Colors.main_04_white};
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
    font-size: ${FontSize.lg};
  }
`;
