import { useGetData } from 'api/data';
import Page from 'component/Page';
import TextInput from 'component/ui/Input';
import useAPI from 'hooks/uesAPI';
import { MoveBtn } from 'pages/question/QuestionBoardList';
import React, { useEffect, useState } from 'react';
import { AllAnswer, AnswerData } from 'redux/answer/answerslice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import styled from 'styled-components';
import BlogAnswerList from './BlogAnswerList';
import BlogAnswerListt from './BlogAnswerList';

export default function BlogAnswer({ blogId }: { blogId: number | string | undefined }) {
  const [content, setComment] = useState<string>('');
  const [answer, setAnswer] = useState<AnswerData[] | []>([]);
  const api = useAPI();
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });
  const { memberId } = useAppSelector((state) => state.loginInfo);
  const { deleteAnswerData, putAnswerData, getAnswerData } = useGetData();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await api.post(`/blogs/answer/${blogId}`, { content }).catch(console.error);
    getAnswer().catch(console.error);
  };

  const getAnswer = async () => {
    const response = await api.get(`blogs/answer/${blogId}?page=1&sortedBy=hot`);
    setAnswer(response.data.answers);
  };

  const deleteAnswer = (answerId: number | string) => {
    deleteAnswerData('blogs', answerId)
      .then((res) => {
        getAnswerData(blogId, 'blogs', setAnswer).catch(console.error);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getAnswer().catch(console.error);
  }, []);

  return (
    <AnswerWrapper>
      {/* <h3>답변내용 ( 답변 수 : {answer.length} )</h3> */}
      <p>댓글 작성</p>
      <StyledForm onSubmit={submitHandler}>
        <StyledInput type="text" placeholder="댓글을 입력해주세요" setState={setComment} />
        <MoveBtn children="작성" />
        {/* 추후에 위치정보도 함께 첨부  */}
      </StyledForm>
      <h3>답변내용 ( 답변 수 : {answer && answer.length} )</h3>
      {answer &&
        answer.map((answer) => (
          <BlogAnswerList
            key={answer.answerId}
            blogId={blogId}
            answer={answer}
            onAnswer={setAnswer}
            onDelete={deleteAnswer}
          />
        ))}
      {pageNation && <Page pages={pageNation} onPage={setPageNation} />}
    </AnswerWrapper>
  );
}
const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const StyledInput = styled(TextInput)`
  height: 5rem;
  width: 50%;
  border-radius: 0.3rem;
`;
const AnswerWrapper = styled.div`
  margin-top: 50px;
  width: 80%;
`;
