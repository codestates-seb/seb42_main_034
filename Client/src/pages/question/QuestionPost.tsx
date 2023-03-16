import React, { useState } from 'react';
import styled from 'styled-components';
import Editor from '../../component/board/Editor';

// css

const Input = styled.input`
  display: flex;
`;

export default function QuestionPost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contentHalder = (value: string) => {
    setContent(value);
  };

  const handleSubmit = () => {
    // axios
  };

  return (
    <>
      <Input type="text" value={title} onChange={titleHandler} />
      <Editor value={content} onChange={contentHalder} />
      <button onClick={handleSubmit}>작성</button>
    </>
  );