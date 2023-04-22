import { useQuery } from '@tanstack/react-query';
import { BoardData, useGetData } from 'api/data';
import { Colors, FontSize } from 'component/style/variables';
import useAPI from 'hooks/uesAPI';
import React from 'react';
import styled from 'styled-components';

export default function BoardDetail({ data, detail }: { data: BoardData; detail: BoardData }) {
  return (
    <>
      <ListWrapper>
        <Item>
          <Title className="title">{detail.title}</Title>
          <div className="divide_title">
            조회수:{detail.viewCnt} | 작성시간: {data.createdAt.split('T')[0]}{' '}
          </div>
        </Item>

        <pre className="flex" dangerouslySetInnerHTML={{ __html: detail.content }} />
      </ListWrapper>
    </>
  );
}
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50vh;
  .flex {
    flex: 1 1 auto;
    min-height: 40%;
    width: 100%;
    font-size: ${FontSize.md};
    height: 28em;
    border: 1px solid ${Colors.text_black};
    padding: 1.2em;
  }
`;

const Item = styled.div`
  border: 1px solid blue;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  height: 8rem;
  flex-direction: column;
  justify-content: center;
  padding: 1.2em;
  .divide_title {
    display: flex;
    justify-content: end;
  }
  .title {
    font-size: ${FontSize.h3};
    font-weight: bold;
  }
`;

const Title = styled.div`
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
`;
