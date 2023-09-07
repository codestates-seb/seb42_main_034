import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BoardData, getFilterData, queryKeys, useLike } from 'api/data';
import { Colors, FontSize } from 'component/style/variables';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineDislike } from 'react-icons/ai';
import { AiOutlineLike } from 'react-icons/ai';
import { Button } from 'component/ui/Button';
import { Flex, HoverAction } from 'component/style/cssTemplete';
import Tag from './Tags';
import { useLocation } from 'react-router-dom';
import { GrFormView } from 'react-icons/gr';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAnswerLike, getAnswersData } from 'redux/answer/answerslice';
import { elapsedTime } from 'libs/date';
export default function BoardDetail({ section, detail }: { section: string; detail: BoardData }) {
  const { blogLikes } = useLike();
  const queryClient = useQueryClient();
  // const { region } = useParams();
  const search = useLocation().search.split('=');
  const isSelected = useAppSelector((state) => state.answer.data);
  //내 프로필 url
  const { avatarUrl } = useAppSelector((state) => state.loginInfo);
  console.log(isSelected);
  const dispatch = useAppDispatch();

  const region = getFilterData();
  const [isLike, setIsLike] = useState(false);
  const { mutate } = useMutation(blogLikes, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.data);
    },
  });
  const handleLikes = () => {
    mutate({ blogId: detail.blogId, isLike });
    setIsLike(!isLike);
  };
  console.log(isSelected.some((el) => el.checked));

  useEffect(() => {
    //채택확인
    dispatch(getAnswersData({ answers: isSelected }));
  }, []);
  return (
    <>
      <Item>
        <Flex justify="space-between">
          <div>
            {' '}
            {detail.tags.map((tag, idx) => (
              <Tag key={idx} text={tag} region={region} section={section} />
            ))}
          </div>
          {isSelected.some((el) => el.checked) && <SelectedMark>☑ 채택완료!</SelectedMark>}
        </Flex>

        <Title className="title">
          <span className="question">Q . </span>
          <span>{detail.title}</span>
        </Title>
        <Flex justify="space-between" items="center">
          <Flex gap="1rem" items="center">
            {/* 추후에 avatarUrl 추가 */}
            <Flex>
              {' '}
              <Avatar src={`/image/user.png`} /> {detail.writer}
            </Flex>
            <Writer>{elapsedTime(detail.createdAt)}</Writer>
          </Flex>
          <div className="divide_title">
            {' '}
            <GrFormView /> {detail.viewCnt}
          </div>
        </Flex>
      </Item>

      <OverFlow>
        <pre className="flex" dangerouslySetInnerHTML={{ __html: detail.content }} />
      </OverFlow>
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
  .question {
    font-size: ${FontSize.h3};
    font-weight: bold;
    color: ${Colors.main_01};
  }
`;

const OverFlow = styled.div`
  overflow: auto;
  width: 90%;
  padding: 1.2em;
`;
const Writer = styled.div`
  color: grey;
  font-size: ${FontSize.lg};
`;
const Avatar = styled.img`
  border-radius: 100%;
  border: 1px solid black;
  width: 1rem;
  height: 1rem;
`;
const SelectedMark = styled.div`
  background: ${Colors.main_03};
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
