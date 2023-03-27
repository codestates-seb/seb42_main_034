import { ReturnData } from 'api/data';
import { Flex } from 'component/style/cssTemplete';
import { Colors } from 'component/style/variables';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Card = styled.li`
  background: ${Colors.main_04_white};
  margin: 2rem;
  list-style: none;
`;

export default function QuestionCard({ city, filter }: { city: ReturnData; filter: string }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/board/${filter}details/${city.questionId}`, { state: city });
  };
  return <Card onClick={handleClick}>{city.title}</Card>;
}
