import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BoardDetail from '../../component/board/BoardDetail';
import CommentList from '../../component/board/CommentList';
import Editor from '../../component/board/Editor';
import styled from 'styled-components';

export default function QuestionDetails() {
  const [comment, setComment] = useState<string>('');

  const commentHandler = (value: string) => {
    setComment(value);
  };

  const submitHandler = () => {
    // comment axios
  };

  return (
    <>
      <Outlet />
      <BoardDetail />
      <h1>답변내용 ( 답변 수 : )</h1>
      <CommentList />
      <p>댓글 작성</p>
      <Editor value={comment} onChange={commentHandler} />
      <button onClick={submitHandler}>작성</button>
    </>
  );
}
