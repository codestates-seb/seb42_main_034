import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListData } from 'redux/boardDetails';
import { Flex, HoverAction } from 'component/style/cssTemplete';
import styled from 'styled-components';
import { GrFormView } from 'react-icons/gr';
import { Colors, FontSize } from 'component/style/variables';
import { elapsedTime } from 'libs/date';
export default function QuestionCard({ city }: { city: ListData }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/board/questionsdetails/${city.questionId}`, { state: city });
  };
  return (
    <Card onClick={handleClick}>
      <Flex direction="column" gap="0.4rem">
        <Flex items="center" gap="0.2rem">
          <Topline className="user">
            {city.writer}
            <Avatar src={`/image/user.png`} />
          </Topline>
          ·{' '}
          <Topline>
            <div>{elapsedTime(city.createdAt)}</div>
          </Topline>
        </Flex>
        <div className="title">{city.title}</div>
        {(city &&
          city.tags.map((tag, idx) => (
            <StyledTag key={idx}>
              {' '}
              <span>{`#${tag}`}</span>
            </StyledTag>
          ))) ||
          '여행'}
      </Flex>

      {/* <Flex items="center" gap="5px"> */}

      {/* </Flex> */}
      <ViewIcon>
        <GrFormView />
        <div className="count"> {city.viewCnt}</div>
      </ViewIcon>
    </Card>
  );
}

const Card = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  height: 5rem;
  border-radius: 1rem;
  padding: 1rem;
  border-bottom: 1px solid lightgray;
  ${HoverAction}
  &:hover {
    background: #fafafa;
  }

  .user {
    display: flex;
    align-items: center;
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
const Topline = styled.div`
  font-size: ${FontSize.md};
  margin: 0.2rem;
`;
const StyledTag = styled.div`
  color: ${Colors.main_02};
  font-weight: bold;
  font-size: ${FontSize.sm};
  box-shadow: 3px 3px 3px -2px rgba(0, 0, 0, 0.29);
  border-radius: 0.2rem;
  padding: 0.4rem;
  width: fit-content;
  text-align: center;
`;
const Avatar = styled.img`
  border-radius: 100%;
  border: 1px solid black;
  width: 1rem;
  height: 1rem;
`;

const ViewIcon = styled.div`
  display: flex;
  align-items: end;
  .view {
    font-size: 2rem;
  }
  .count {
    font-size: ${FontSize.md};
  }
`;
