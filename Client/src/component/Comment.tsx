import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { MoveBtn } from 'pages/QuestionBoardList';
import TextInput from './ui/Input';
import { useReply } from 'api/data';
import { BsArrowReturnRight } from 'react-icons/bs';
import styled from 'styled-components';
import { Flex } from './style/cssTemplete';
import { Colors, FontSize } from './style/variables';
export interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
}
export default function Comment({ comment, getAnswer }: { comment: Comment; getAnswer: () => Promise<void> }) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [modify, setModify] = useState<string>(comment.content);
  const { patchReply, deleteReply } = useReply();
  const handlePatch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      patchReply(comment.commentId, 'questions', modify)
        .then((res) => {
          console.log(res);
          setIsEdit(!isEdit);
          getAnswer();
        })
        .catch((error) => console.log('댓글실패', error));
    },
    [comment],
  );
  return (
    <BackGround items="center" key={comment.commentId}>
      <Arrow />

      {isEdit ? (
        <StyledForm onSubmit={handlePatch}>
          <TextInput value={modify} type="modifyComment" setState={setModify} />
          <MoveBtn children="수정완료" />
        </StyledForm>
      ) : (
        <Flex items="space-between">
          <Flex direction="column">
            <div>{comment.content}</div>
            <DateFont>{dayjs(comment.createdAt).format('YYYY-MM-DD')}</DateFont>
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
    </BackGround>
  );
}
const StyledForm = styled.form`
  display: flex;
`;
const DateFont = styled.div`
  font-size: ${FontSize.md};
  color: ${Colors.text_grey};
`;
const Arrow = styled(BsArrowReturnRight)`
  margin-right: 1.2em;
`;
const BackGround = styled(Flex)`
  background: ${Colors.main_01};
  border-bottom: 1px solid ${Colors.text_grey};
  padding: 1em;
`;
