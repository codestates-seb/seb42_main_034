import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BoardData, queryKeys, useGetData, useLike } from 'api/data';
import { Colors, FontSize } from 'component/style/variables';
import useAPI from 'hooks/uesAPI';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { Button } from 'component/ui/Button';
import { Flex, HoverAction } from 'component/style/cssTemplete';
import Tag from './Tags';
import { useParams } from 'react-router-dom';
export default function BoardDetail({
  section,
  data,
  detail,
}: {
  section?: string;
  data: BoardData;
  detail: BoardData;
}) {
  const { blogLikes } = useLike();
  const queryClient = useQueryClient();
  const { region } = useParams();

  const [isLike, setIsLike] = useState(false);
  const { mutate } = useMutation(blogLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.data);
    },
  });

  const handleLikes = () => {
    mutate({ blogId: data.blogId, isLike });
    setIsLike(!isLike);
  };

  return (
    <>
      <ListWrapper>
        <Item>
          <Flex justify="start">
            {' '}
            {data.tags.map((tag) => (
              <Tag text={tag} region={region} />
            ))}
          </Flex>
          <Title className="title">{detail.title}</Title>
          <div className="divide_title">
            조회수:{detail.viewCnt} | 작성시간: {data.createdAt.split('T')[0]}{' '}
          </div>
        </Item>

        <pre className="flex" dangerouslySetInnerHTML={{ __html: detail.content }} />
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
