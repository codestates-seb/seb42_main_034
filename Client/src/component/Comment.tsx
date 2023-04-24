import React, { useState } from 'react';
import dayjs from 'dayjs';
import { MoveBtn } from 'pages/question/QuestionBoardList';
import TextInput from './ui/Input';
import { useReply } from 'api/data';
import { BsArrowReturnRight } from 'react-icons/bs';
import styled from 'styled-components';
import { Flex } from './style/cssTemplete';
export interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
}
export default function Comment({ comment, getAnswer }: { comment: Comment; getAnswer: () => Promise<void> }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modify, setModify] = useState<string>(comment.content);
  const { patchReply, deleteReply } = useReply();
  const handlePatch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    patchReply(comment.commentId, 'questions', modify).then((res) => {
      console.log(res);
      setIsEdit(!isEdit);
      getAnswer();
    });
  };
  return (
    <div>
      <BsArrowReturnRight />
      {isEdit ? (
        <StyledForm onSubmit={handlePatch}>
          <TextInput value={modify} type="modifyComment" setState={setModify} />
          <MoveBtn children="수정완료" />
        </StyledForm>
      ) : (
        <Flex>
          <Flex>
            <div>{comment.content}</div>
            <div>{dayjs(comment.createdAt).format('YYYY-MM-DD')}</div>
          </Flex>
          <div>
            <MoveBtn
              children="수정"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            />
            <MoveBtn
              children="삭제"
              onClick={() => {
                deleteReply(comment.commentId, 'questions').then((res) => {
                  getAnswer();
                });
              }}
            />
          </div>
        </Flex>
      )}
    </div>
  );
}
const StyledForm = styled.form`
  display: flex;
`;
