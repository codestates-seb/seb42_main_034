import React, { useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Tags from '../../component/board/Tags';
import axios from 'axios';

import useAPI from '../../hooks/uesAPI';
import { useAppSelector } from 'redux/hooks';
import { MoveBtn, StyledCategoryBtn } from './BoardList';
import QuillEditor from 'component/ui/QuillEditor';
import ReactQuill from 'react-quill';
const PostWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  padding: 10rem;
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
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();
  const { accessToken, memberId } = useAppSelector((state) => state.loginInfo);
  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log('ss');
  };
  // const titleInput = () =>
  //   useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //     titleHandler(e);
  //   }, []); 대체 input re-rendering언제 할수있는지
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
        //권한이 없습니다 띄우기
      });
  };

  return (
    <>
      <PostWrapper>
        <Input type="text" value={title} onChange={titleHandler} placeholder="제목" />
        <ResizeEditor
          width="100%"
          height="100%"
          quillRef={quillRef}
          htmlContent={content}
          setHtmlContent={setContent}
        />
        <Tags tag={tag} addTag={addTag} removeTag={removeTag} />
        <MoveBtn onClick={submitHandler}>작성</MoveBtn>
        <Outlet />
      </PostWrapper>
    </>
  );
}
const ResizeEditor = styled(QuillEditor)`
  width: 20rem;
  background: white;
`;
