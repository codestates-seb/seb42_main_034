import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonWrapper } from '../../component/board/Button';
import Editor from '../../component/board/Editor';
import Tags from '../../component/board/Tags';
import axios from 'axios';

import useAPI from '../../hooks/uesAPI';
import { useAppSelector } from 'redux/hooks';
import { MoveBtn, StyledCategoryBtn } from './BoardList';
const PostWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  padding: 10rem;
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
  const [tag, setTag] = useState<string[]>([]);
  const api = useAPI();
  const navigate = useNavigate();
  const { accessToken, memberId } = useAppSelector((state) => state.loginInfo);
  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const contentHandler = (value: string) => {
    setContent(value);
  };

  const addTag = (newTag: string) => {
    setTag((tag) => [...tag, newTag]);
  };

  const removeTag = (index: number) => {
    setTag((tag) => [...tag.slice(0, index), ...tag.slice(index + 1)]);
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

    api
      .post(
        '/questions',
        {
          memberId,
          title,
          content,
          tag,
          category: 'project',
        },
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(function (response) {
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <PostWrapper>
        <Input type="text" value={title} onChange={titleHandler} placeholder="제목" />
        <Editor value={content} onChange={contentHandler} />
        <Tags tag={tag} addTag={addTag} removeTag={removeTag} />
        <MoveBtn onClick={submitHandler}>작성</MoveBtn>
        <Outlet />
      </PostWrapper>
    </>
  );
}
