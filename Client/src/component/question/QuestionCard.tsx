import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListData } from 'redux/boardDetails';
import { Flex, HoverAction } from 'component/style/cssTemplete';
import styled from 'styled-components';
import { Colors, FontSize } from 'component/style/variables';
import dayjs from 'dayjs';

import { getFilterData } from 'api/data';
import Profile from 'component/ui/Profile';

export default function QuestionCard({ city }: { city: ListData }) {
  const navigate = useNavigate();
  const region = getFilterData();
  const handleClick = () => {
    navigate(`/board/questionsdetails/${city.questionId}`, { state: city });
  };
  return (
    <Card onClick={handleClick}>
      <MaxWidthTag>
        {(city && city.tags.map((tag, idx) => <StyledTag key={idx}> {`#${tag}`}</StyledTag>)) || '여행'}
      </MaxWidthTag>
      <div className="title">{city.title}</div>

      <Flex gap="1em" className="sidecontent" items="center">
        <Flex items="center" gap="5px">
          <div>{city.writer}</div>
          <Avatar src={`/image/user.png`} />
        </Flex>
        <ViewIcon>
          <Profile />
          <div className="count"> {city.viewCnt}</div>
        </ViewIcon>
        <div>{dayjs(city.createdAt).format('YYYY-MM-DD')}</div>
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
  &:hover {
    background: lightgray;
  }
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
const StyledTag = styled.span`
  color: ${Colors.main_02};
  font-weight: bold;
  font-size: ${FontSize.lg};
  box-shadow: 3px 3px 3px -2px rgba(0, 0, 0, 0.29);
  border-radius: 0.2rem;
  width: 100%;
  padding: 0.4rem;
  text-align: center;
`;
const Avatar = styled.img`
  border-radius: 100%;
  border: 1px solid black;
  width: 2rem;
  height: 2rem;
`;

const ViewIcon = styled.div`
  display: flex;
  align-items: center;
  .view {
    font-size: 2rem;
  }
  .count {
    font-size: 1rem;
  }
`;
