import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useAPI from '../hooks/uesAPI';
import { useAppSelector } from 'redux/hooks';
import { MoveBtn } from './QuestionBoardList';
import QuillEditor from 'component/ui/QuillEditor';
import ReactQuill from 'react-quill';
const PostWrapper = styled.form`
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
//dd
export default function QuestionPost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const api = useAPI();
  const { category } = useParams() as { category: string };
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();
  const { accessToken, memberId } = useAppSelector((state) => state.loginInfo);
  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('제목을 입력하세요.');
      return;
    }
    if (content.trim() === '') {
      alert('내용을 입력하세요.');
      return;
    }
    if (tags.length === 0) {
      alert('태그를 입력하세요.');
      return;
    }
    api
      .post('/questions', {
        memberId,
        title,
        content,
        tags,
        category,
      })
      .then(function (response) {
        navigate(-1);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        //권한이 없습니다 띄우기
      });
  };
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);
        const fileName = file.name;
        console.log(fileName);
      }
    };
  };
  const handleEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputArray = inputValue.split(',').map((item) => item.trim());

    setTags(inputArray);
  };

  return (
    <>
      <PostWrapper onSubmit={submitHandler}>
        <Input type="text" value={title} onChange={titleHandler} placeholder="제목" />
        <ResizeEditor
          setImage={setImage}
          width="100%"
          height="100%"
          quillRef={quillRef}
          htmlContent={content}
          setHtmlContent={setContent}
        />
        <input value={tags} onChange={handleEnter} placeholder="태그(중복선택시 쉼표(,)로 나눠주세요)" />
        <MoveBtn>작성</MoveBtn>
        <Outlet />
      </PostWrapper>
    </>
  );
}
const ResizeEditor = styled(QuillEditor)`
  width: 20rem;
  background: white;
`;
