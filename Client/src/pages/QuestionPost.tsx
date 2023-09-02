import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useAPI from '../hooks/uesAPI';
import { useAppSelector } from 'redux/hooks';
import { MoveBtn } from './QuestionBoardList';
import QuillEditor from 'component/ui/QuillEditor';
import ReactQuill from 'react-quill';
import { Colors } from 'component/style/variables';
import { getFilterData } from 'api/data';
import { Flex } from 'component/style/cssTemplete';
import BackBtn from 'component/ui/BackBtn';

//dd
export default function QuestionPost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const api = useAPI();
  const region = getFilterData();
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
      <Section>
        <BackBtn />
        <Flex items="self-start" gap="0.7rem">
          {' '}
          <span>질문등록</span>
          <img src={`/image/pencil.png`} /> <span>- {region}</span>
        </Flex>
      </Section>
      <PostWrapper onSubmit={submitHandler}>
        {' '}
        <span className="title">제목</span>
        <Input type="text" value={title} onChange={titleHandler} placeholder="질문할 제목을 입력해 주세요" />
        <ResizeEditor
          setImage={setImage}
          width="100%"
          height="100%"
          quillRef={quillRef}
          htmlContent={content}
          setHtmlContent={setContent}
        />
        <span className="title">태그</span>
        <TagInput value={tags} onChange={handleEnter} placeholder="태그(중복선택시 쉼표(,)로 나눠주세요)" />
        <SubmitBtn>작성</SubmitBtn>
        <Outlet />
      </PostWrapper>
    </>
  );
}
const PostWrapper = styled.form`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  padding: 5rem;
  width: 100%;
  .title {
    width: 100%;
    font-weight: bold;
    margin-top: 0.2rem;
  }
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  height: 3rem;
  border: 1px solid ${Colors.border_001};
  border-radius: 5px;
  margin-bottom: 0.5rem;
  :focus {
    outline: 2px solid var(--main-002);
  }
`;
const ResizeEditor = styled(QuillEditor)`
  width: 20rem;
  background: white;
`;
const TagInput = styled.input`
  margin-top: 0.9rem;
  height: 3rem;
  border-radius: 0.2rem;
  width: 100%;

  border: 1px solid ${Colors.border_001};
`;
const SubmitBtn = styled(MoveBtn)`
  background: rgb(98, 163, 244);
  font-size: 10px;
  cursor: pointer;
  transition: all 200ms ease-in 0s;
  margin: 1rem;
  border-radius: 0.5rem;
  width: 10rem;
  height: 3rem;
  color: white;
`;
const Section = styled.h2`
  text-align: start;
  width: 100%;
`;
