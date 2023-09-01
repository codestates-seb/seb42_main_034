import { useGetData, useLike, useReply } from 'api/data';
import { Flex } from 'component/style/cssTemplete';
import TextInput from 'component/ui/Input';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { MdOutlineTaskAlt } from 'react-icons/md';
import { MoveBtn } from 'pages/QuestionBoardList';
import React, { useCallback, useEffect, useState } from 'react';
import { AnswerData } from 'redux/answer/answerslice';
import { useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';
import Comment from 'component/Comment';
import { elapsedTime } from 'libs/date';
import { Colors, FontSize } from 'component/style/variables';

export interface answerReturn {
  questionId: number | string;
  content: string;
  title: string;
  tag: string;
  nickName: string;
  createdAt: string;
  likeCnt: number;
  checked: boolean;
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
  const { seletedQuestion } = useLike();
  const { createReply } = useReply();

  useEffect(() => {
    // onAnswer(answer);
  }, [answer, isLike]);
  //대댓글을 달면 answer가 다시 get되어야한다
  const handlePost = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createReply(answer.answerId, 'questions', comment).then((res) => getAnswer());
    },
    [answer],
  );
  console.log(answer);

  return (
    <AnswerWrapper>
      <AnswerContainer>
        <AnswerItem>
          <AnswerTop>
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
                <Flex justify="space-between" width="100%">
                  <Flex>
                    <Avatar src={`/image/user.png`} />
                    <div className="innerContent">
                      <div className="content">
                        <span>{answer.nickName}</span>

                        <span className="createAt">{elapsedTime(answer.createdAt)}</span>
                      </div>

                      <div>{answer.content}</div>
                    </div>
                  </Flex>

                  <div>
                    {answer.memberId === memberId && (
                      <MoveBtn children="삭제" onClick={() => onDelete(answer.answerId)} />
                    )}
                    {answer.memberId === memberId && (
                      <MoveBtn
                        children="수정"
                        onClick={() => {
                          setIsEdit(!isEdit);
                        }}
                      />
                    )}
                    {/**로그인상태 해결하고 적용 */}
                    {answer.checked ||
                      (memberId === writerId && (
                        <MoveBtn
                          children={
                            <div>
                              채택하기
                              <MdOutlineTaskAlt />
                            </div>
                          }
                          onClick={() => {
                            seletedQuestion(answer.answerId).then((res) => {
                              getAnswer();
                            });
                          }}
                        ></MoveBtn>
                      ))}{' '}
                  </div>
                </Flex>
              </>
            )}
          </AnswerTop>

          <AnswerContent>
            <MoveBtn children={`답글보기${isComment ? '▽' : '△'}`} onClick={() => setIsComment(!isComment)} />

            <StyledBtn
              onClick={() => {
                onLike(isLike, answer.answerId, setIsLike);
              }}
            >
              <div>{answer.likeCnt}</div>
              {isLike ? <AiFillHeart /> : <AiOutlineHeart />}
            </StyledBtn>
          </AnswerContent>
        </AnswerItem>
      </AnswerContainer>
      {isComment && (
        <div>
          <div>
            {answer.comments &&
              answer.comments.map((comment, idx) => <Comment comment={comment} getAnswer={getAnswer} />)}
          </div>
          <ReplyForm onSubmit={handlePost}>
            <ReplyInput type="comment" placeholder="댓글을 입력해주세요" setState={setComment} />

            <MoveBtn children="작성" />
          </ReplyForm>
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
  margin-bottom: 0;
`;
const AnswerItem = styled.li`
  padding: 20px;
  border-bottom: 1px solid black;
`;
const AnswerContent = styled.div`
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const StyledBtn = styled(Button)`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  transition: 200ms ease-in;
  gap: 0.2em;
  &:hover {
    transform: scale(1.1);
  }
`;
const AnswerTop = styled(Flex)`
  padding-left: 1.5em;
  .content {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .createAt {
    color: grey;
    font-size: ${FontSize.md};
  }
  .innerContent {
    font-weight: bold;
    margin-left: 0.5rem;
  }
`;
const ReplyInput = styled(TextInput)`
  height: 6em;
  width: 60%;
  margin-top: 0.4em;
  border-radius: 0.7rem;
  &:focus-within {
    border-color: ${Colors.main_01};
  }
`;
const ReplyForm = styled.form`
  text-align: center;
  width: 100%;
`;
const Avatar = styled.img`
  border-radius: 100%;
  border: 1px solid black;
  width: 3rem;
  height: 3rem;
`;
