import { useQuery } from '@tanstack/react-query';
import { useGetData } from 'api/data';
import { MoveBtn } from 'pages/question/BoardList';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import AnswerList from './board/AnswerList';
import CommentList from './board/CommentList';
import Editor from './board/Editor';
import { Flex } from './style/cssTemplete';

export default function Answer({ questionId }: { questionId: number | string }) {
  const [content, setComment] = useState<string>('');
  const { postAnswerData } = useGetData();
  const commentHandler = (value: string) => {
    setComment(value);
  };
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const submitHandler = () => {
    postAnswerData(questionId, { content, memberId }).catch(console.log);
  };

  return (
    <Flex direction="column" items="center">
      <AnswerList questionId={questionId} />
      <p>댓글 작성</p>

      <Editor value={content} onChange={commentHandler} />
      <MoveBtn onClick={submitHandler} children="작성" />
    </Flex>
  );
}
