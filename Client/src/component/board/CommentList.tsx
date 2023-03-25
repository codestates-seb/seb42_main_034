import useConfirm from 'hooks/useConfirm';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonWrapper } from './Button';

const CommentContainer = styled.ul`
  height: auto;
  width: 60rem;
  list-style: none;
`;

const CommentItem = styled.li`
  border: 1px solid gray;
  padding: 20px;
`;

const CommentContent = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 10px;

  button {
    margin-left: 5px;
    border-radius: 5px;
  }
`;

export default function CommentList() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  // const deleteHandler = useConfirm('정말 삭제하시겠습니까?','yes','no' )


    // window.confirm('정말 삭제하시겠습니까?');
 

  return (
    <>
      <CommentContainer>
        {/* {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <div>{comment.content}</div>
            <CommentContent>{comment.createAt}</CommentContent>
          </CommentItem>
        ))} */}
        <CommentItem>
          저는 제주도를 여행지로 추천합니다
          <CommentContent>
            작성시간 : 2023.03.19 14:00:00
            {/* {isLogin ? <button onClick={deleteHandler}>삭제</button> : null} */}
          </CommentContent>
        </CommentItem>
      </CommentContainer>
    </>
  );
}
