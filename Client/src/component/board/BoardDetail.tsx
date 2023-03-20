import React from 'react';
import styled from 'styled-components';

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const ListContainer = styled.ul`
  width: 60rem;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column; /* 수정된 부분 */
  align-items: center;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid blue;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
`;

const Sub = styled.div`
  font-size: 20x;
`;

export default function BoardDetail() {
  return (
    <>
      <ListWrapper>
        <ListContainer>
          <Item>
            <TitleWrapper>
              <Title>여름 여행지로 제주 어떤가요?</Title>
              <Sub>조회수: 0 | 작성시간: 23.03.19 14:00:00 </Sub>
            </TitleWrapper>
          </Item>
          <div>
            <Sub>제주도를 가고싶은데 갈지말지 아직 못정해서 어떻게 생각하시는지 조언좀 듣고싶어요</Sub>
          </div>
        </ListContainer>
      </ListWrapper>
    </>
  );
}
