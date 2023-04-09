import React, { useState } from 'react';
import { Form } from 'react-router-dom';
import styled from 'styled-components';

export const BlogPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <PostContainer>
        <Form onSubmit={handleSubmit}></Form>
      </PostContainer>
    </>
  );
};
const PostContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
`;

export default BlogPost;
