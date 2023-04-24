import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListData } from 'redux/boardDetails';
import { Flex, HoverAction } from 'component/style/cssTemplete';
import styled from 'styled-components';
import { Colors, FontSize } from 'component/style/variables';
import dayjs from 'dayjs';
export default function QuestionCard({ city }: { city: ListData }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/board/questionsdetails/${city.questionId}`, { state: city });
  };
  return (
    <Card onClick={handleClick}>
      <MaxWidthTag>{(city && city.tags.map((tag, idx) => <div key={idx}>#{tag}</div>)) || '여행'}</MaxWidthTag>
      <div className="title">{city.title}</div>

      <Flex gap="1em" direction="column" className="sidecontent">
        <div>{dayjs(city.createdAt).format('YYYY-MM-DD')}</div>
        <div>{city.writer}</div>
      </Flex>
    </Card>
  );
}

const Card = styled.li`
  margin: 2rem;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem;
  height: 2rem;
  border-radius: 1rem;
  padding: 1rem;
  border-bottom: 1px solid lightgray;

  ${HoverAction}
  .title {
    font-weight: bold;
    font-size: ${FontSize.lg};

    @media (max-width: 760px) {
      font-size: ${FontSize.md};
    }
  }
  .sidecontent {
    font-size: ${FontSize.md};
    @media (max-width: 760px) {
      font-size: ${FontSize.sm};
    }
  }
`;
const MaxWidthTag = styled.div`
  max-width: 12%;
  min-width: 12%;
  div {
    font-size: ${FontSize.md};
  }
`;
