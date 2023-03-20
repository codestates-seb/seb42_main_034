import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListContainer = styled.ul`
  width: 50rem;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid blue;
`;

const Title = styled(Link)`
  display: flex;
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
`;

const Sub = styled.div`
  font-size: 15px;
`;

// props

export default function BoardList() {
  return (
    <ListWrapper>
      <ListContainer>
        {/* {data.map((el) => (
          <Item key={el.questionId}>
            <Title to={`/board/${el.questionId}`}>{el.title}</Title>
            <Sub>
              {el.writer} | {el.createdAt}
            </Sub>
          </Item>
        ))} */}
        <Item>
          memberId
          <Title to="/board/questiondetails/1">제목1</Title>
          <Sub>작성자1 | 작성시간</Sub>
        </Item>
        <Item>
          memberId
          <Title to="/">제목2</Title>
          <Sub>작성자2 | 작성시간</Sub>
        </Item>
        <Item>
          memberId
          <Title to="/">제목3</Title>
          <Sub>작성자3 | 작성시간</Sub>
        </Item>
        <Item>
          memberId
          <Title to="/">제목4</Title>
          <Sub>작성자4 | 작성시간</Sub>
        </Item>
      </ListContainer>
    </ListWrapper>
  );
}
