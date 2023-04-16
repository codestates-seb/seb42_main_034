import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListData } from 'redux/boardDetails';
import { Flex, HoverAction } from 'component/style/cssTemplete';
import styled from 'styled-components';
import { Colors, FontSize } from 'component/style/variables';
export default function QuestionCard({ city }: { city: ListData }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/board/questionsdetails/${city.questionId}`, { state: city });
  };
  return (
    <Card onClick={handleClick}>
      <div>{city.tags}</div>
      <div className="title">{city.title}</div>

      <Flex gap="2rem" direction="column">
        <div>{city.createdAt.split('T')[0]}</div>
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
  ${HoverAction}
  .title {
    font-weight: bold;
    font-size: ${FontSize.lg};
  }
`;
