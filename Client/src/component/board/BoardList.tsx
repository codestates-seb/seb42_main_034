import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ListContainer = styled.ul`
  width: 50rem;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid blue;
`;

const Title = styled(Link)`
  font-size: 20px;
  white-space: nowrap;
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
      </ListContainer>
    </ListWrapper>
  );
}
