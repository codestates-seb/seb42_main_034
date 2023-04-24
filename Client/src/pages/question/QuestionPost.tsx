import React, { useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useAPI from '../../hooks/uesAPI';
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

export default function QuestionPost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const api = useAPI();
  const { category } = useParams();
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();
  const { accessToken, memberId } = useAppSelector((state) => state.loginInfo);
  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  console.log(tags);

  let section = '';
  if (category === '서울') {
    section = 'seoul';
  } else if (category === '경상') {
    section = 'kyungsang';
  } else if (category === '강원') {
    section = 'gangwon';
  } else if (category === '충청') {
    section = 'chungcheong';
  } else if (category === '부산') {
    section = 'busan';
  } else if (category === '제주') {
    section = 'jeju';
  } else if (category === '인천') {
    section = 'incheon';
  } else if (category === '울산') {
    section = 'ulsan';
  } else if (category === '전라') {
    section = 'Jeolla';
  } else if (category === '경기') {
    section = 'gyeonggi';
  }
  console.log(section);

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

    api
      .post('/questions', {
        memberId,
        title,
        content,
        tags,
        category: section,
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
  console.log(tags);
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
