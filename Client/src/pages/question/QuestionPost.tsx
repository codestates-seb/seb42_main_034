import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonWrapper } from '../../component/board/Button';
import Editor from '../../component/board/Editor';

// css
const PostWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled(ButtonWrapper)`
  margin-top: 10px;
`;

const Input = styled.input`
  display: flex;
  width: 40rem;
  height: 25px;
  border: 1px solid var(--main-001);
  border-radius: 5px;
  :focus {
    outline: 2px solid var(--main-002);
  }
`;

export default function QuestionPost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contentHandler = (value: string) => {
    setContent(value);
  };

  const submitHandler = () => {
    if (title.trim() === '') {
      alert('제목을 입력하세요.');
      return;
    }
    if (content.trim() === '') {
      alert('내용을 입력하세요.');
      return;
    }
    window.confirm('작성하시겠습니까?');
    // axios
  };

  return (
    <>
      <PostWrapper>
        <Input type="text" value={title} onChange={titleHandler} placeholder="제목" />
        <Editor value={content} onChange={contentHandler} />
        <Button onClick={submitHandler}>작성</Button>
        <Outlet />
      </PostWrapper>
    </>
  );
}
