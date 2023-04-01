import { useQuery } from '@tanstack/react-query';
import { BoardData, useGetData } from 'api/data';
import { Colors, FontSize } from 'component/style/variables';
import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function BoardDetail({ data }: { data: BoardData }) {
  const { getBoardData, getAnswerData } = useGetData();
  const {
    isLoading,
    error,
    data: post,
  } = useQuery(['region', data] as const, async () => await getBoardData(data.questionId), {
    staleTime: 1000 * 15,
  });

  return (
    <>
      <ListWrapper>
        <Item>
          <Title className="title">{data.title}</Title>
          <div className="divide_title">
            조회수:{data.viewCnt} | 작성시간: {data.createdAt.split('T')[0]}{' '}
          </div>
        </Item>

        <div className="flex"> {post?.data.content}</div>
      </ListWrapper>
    </>
  );
}
const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60rem;
  height: 50vh;
  .flex {
    flex: 1 1 auto;
    font-size: ${FontSize.h3};
    width: 38em;
    height: 28em;
    border: 1px solid ${Colors.text_black};
    padding: 2rem;
  }
`;

const Item = styled.div`
  border: 1px solid blue;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 65em;
  display: flex;
  height: 8rem;
  flex-direction: column;
  justify-content: center;
  padding: 0.8rem;
  .divide_title {
    display: flex;
    justify-content: end;
  }
  .title {
    font-size: ${FontSize.h2};
    font-weight: bold;
  }
`;

const Title = styled.div`
  font-size: 22px;
  white-space: nowrap;
  text-align: center;
  text-decoration: none;
`;
