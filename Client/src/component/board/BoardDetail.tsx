import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BoardData, getFilterData, queryKeys, useGetData, useLike } from 'api/data';
import { Colors, FontSize } from 'component/style/variables';
import useAPI from 'hooks/uesAPI';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { Button } from 'component/ui/Button';
import { Flex, HoverAction } from 'component/style/cssTemplete';
import Tag from './Tags';
import { useLocation, useParams } from 'react-router-dom';
export default function BoardDetail({ section, detail }: { section: string; detail: BoardData }) {
  const { blogLikes } = useLike();
  const queryClient = useQueryClient();
  // const { region } = useParams();
  const search = useLocation().search.split('=');
  const region = getFilterData();
  const [isLike, setIsLike] = useState(false);
  const { mutate } = useMutation(blogLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.data);
    },
  });
  //dddd
  const handleLikes = () => {
    mutate({ blogId: detail.blogId, isLike });
    setIsLike(!isLike);
  };
  console.log(detail);
  return (
    <>
      <Item>
        <Flex justify="start">
          {' '}
          {detail.tags.map((tag, idx) => (
            <Tag key={idx} text={tag} region={region} section={section} />
          ))}
        </Flex>
        <Title className="title">{detail.title}</Title>
        <Flex justify="space-between" items="center">
          <div>작성자 : {detail.writer}</div>
          <div className="divide_title">
            조회수 : {detail.viewCnt} | 작성시간: {detail.createdAt.split('T')[0]}{' '}
          </div>
        </Flex>
      </Item>

      <OverFlow>
        <pre className="flex" dangerouslySetInnerHTML={{ __html: detail.content }} />
      </OverFlow>
      {section === 'blogs' && (
        <Flex>
          {detail.likeCnt}
          <LikeButton onClick={handleLikes}>
            <AiOutlineLike />
          </LikeButton>
          <UnLikeButton onClick={handleLikes}>
            <AiOutlineDislike />
          </UnLikeButton>
        </Flex>
      )}
    </>
  );
}

const Item = styled.div`
  border-bottom: 1px solid ${Colors.button_blue};
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 90%;
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
  margin-bottom: 0.8em;
`;
const LikeButton = styled(Button)`
  border: none;
  background: none;
  ${HoverAction}
  span {
    display: block;
  }
  span > svg {
    width: 1rem;
    height: 2rem;
  }
`;
const UnLikeButton = styled(Button)`
  border: none;
  background: none;
  width: 3em;
  ${HoverAction}
  span {
    display: block;
  }
  span > svg {
    width: 1rem;
    height: 2rem;
  }
`;
const OverFlow = styled.div`
  overflow: auto;
  width: 90%;
  padding: 1.2em;
`;
