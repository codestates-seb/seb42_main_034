import { useGetData, useReply } from 'api/data';
import { answerReturn } from 'component/board/AnswerList';
import { Flex } from 'component/style/cssTemplete';
import TextInput from 'component/ui/Input';
import useAPI from 'hooks/uesAPI';
import { MoveBtn } from 'pages/question/QuestionBoardList';
import React, { useEffect, useState } from 'react';
import { AllAnswer, AnswerData } from 'redux/answer/answerslice';
import { useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import Comment from 'component/Comment';
export interface BlogAnswerReturn {
  blogId: number | string;
  content: string;
  title: string;
  tag: string;
  writer: string;
  createdAt: string;
}
export default function BlogAnswerList({
  blogId,
  answer,
  onAnswer,
  onDelete,
  getAnswer,
}: {
  blogId: number | string | undefined;
  answer: AnswerData;
  onAnswer: React.Dispatch<React.SetStateAction<[] | AnswerData[]>>;
  onDelete: (answerId: number | string) => void;
  getAnswer: () => Promise<void>;
}) {
  const { deleteAnswerData, putAnswerData, getAnswerData } = useGetData();
  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState('');
  const [isComment, setIsComment] = useState(false);
  const { createReply } = useReply();
  const { memberId } = useAppSelector((state) => state.loginInfo);
  useEffect(() => {
    // onAnswer(answer);
  }, [answer]);
  const handlePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createReply(answer.answerId, 'blogs', comment).then((res) => getAnswer());
  };
  const [content, setContent] = useState<string>('');
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
                    putAnswerData('blogs', answer.answerId, content)
                      .then((res) => {
                        getAnswerData(blogId, 'blogs', onAnswer).catch(console.error);
                        setIsEdit(!isEdit);
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
                  <MoveBtn
                    children="수정"
                    onClick={() => {
                      setIsEdit(!isEdit);
                    }}
                  />
                )}
              </>
            )}
            <>{/* 같은 사람일때만 보이게 로직짜기 */}</>
          </Flex>

          <AnswerContent>{answer.likeCnt}</AnswerContent>
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
`;
