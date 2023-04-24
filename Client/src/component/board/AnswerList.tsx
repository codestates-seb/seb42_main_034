import { useGetData, useLike, useReply } from 'api/data';

import { Flex } from 'component/style/cssTemplete';
import TextInput from 'component/ui/Input';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

import { MoveBtn } from 'pages/question/QuestionBoardList';
import React, { useEffect, useState } from 'react';
import { AnswerData } from 'redux/answer/answerslice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';
import Comment from 'component/Comment';

export interface answerReturn {
  questionId: number | string;
  content: string;
  title: string;
  tag: string;
  writer: string;
  createdAt: string;
}

export default function AnswerList({
  questionId,
  blogId,
  answer,
  onAnswer,
  onDelete,
  writerId,
  onLike,
  getAnswer,
}: {
  questionId?: number | string | undefined;
  blogId?: number | string | undefined;
  answer: AnswerData;
  onAnswer: React.Dispatch<React.SetStateAction<[] | AnswerData[]>>;
  onDelete: (answerId: number | string) => void;
  writerId: number;
  onLike: (state: boolean, answerId: number, setState: (value: React.SetStateAction<boolean>) => void) => void;
  getAnswer: () => Promise<void>;
}) {
  const { putAnswerData, getAnswerData } = useGetData();
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState<string>('');
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const [isLike, setIsLike] = useState(false);
  const [comment, setComment] = useState('');
  const [isComment, setIsComment] = useState(false);
  const { setLike, seletedQuestion } = useLike();
  const { createReply } = useReply();
  useEffect(() => {
    // onAnswer(answer);
  }, [answer, isLike]);
  //대댓글을 달면 answer가 다시 get되어야한다
  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createReply(answer.answerId, 'questions', comment).then((res) => getAnswer());
  };

  return (
    <AnswerWrapper>
      <AnswerContainer>
        <AnswerItem>
          <Flex>
            {isEdit ? (
              <form>
                <TextInput value={answer.content} setState={setContent} type="answer" />
                <MoveBtn
                  children="수정완료"
                  onClick={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    putAnswerData('questions', answer.answerId, content)
                      .then((res) => {
                        getAnswerData(questionId, 'questions', onAnswer).catch(console.error);
                        setIsEdit(false);
                      })
                      .catch(console.error);
                  }}
                />
              </form>
            ) : (
              <>
                <div>{answer.content}</div>
                {answer.memberId === memberId && <MoveBtn children="삭제" onClick={() => onDelete(answer.answerId)} />}
                {answer.memberId === memberId && (
                  <>
                    <MoveBtn
                      children="수정"
                      onClick={() => {
                        setIsEdit(!isEdit);
                      }}
                    />
                    <MoveBtn children="답글보기" onClick={() => setIsComment(!isComment)} />
                  </>
                )}
              </>
            )}
            {/**로그인상태 해결하고 적용 */}
            {answer.checked || <MoveBtn children="채택하기" onClick={() => seletedQuestion(answer.answerId)} />}
          </Flex>

          <AnswerContent>
            {answer.likeCnt}

            <StyledBtn
              onClick={() => {
                onLike(isLike, answer.answerId, setIsLike);
              }}
            >
              {isLike ? <AiFillHeart /> : <AiOutlineHeart />}
            </StyledBtn>
          </AnswerContent>
        </AnswerItem>
      </AnswerContainer>
      {isComment && (
        <div>
          <div>
            {answer.comments &&
              answer.comments.map((comment, idx) => <Comment key={idx} comment={comment} getAnswer={getAnswer} />)}
          </div>
          <form onSubmit={handlePost}>
            <TextInput type="comment" placeholder="댓글을 입력해주세요" setState={setComment} />

            <MoveBtn children="작성" />
          </form>
        </div>
      )}
    </AnswerWrapper>
  );
}
const AnswerWrapper = styled.div`
  margin-top: 50px;
`;

const AnswerContainer = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
`;
const AnswerItem = styled.li`
  padding: 20px;
  border: 1px solid gray;
  margin-bottom: 20px;
`;
const AnswerContent = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 0.1em;
`;
const StyledBtn = styled(Button)`
  background: none;
  border: none;
  cursor: pointer;
  transition: 200ms ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
