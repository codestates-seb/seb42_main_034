import React, { useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import useAPI from '../../hooks/uesAPI';
import { useAppSelector } from 'redux/hooks';

import QuillEditor from 'component/ui/QuillEditor';
import ReactQuill from 'react-quill';
import { MoveBtn } from 'pages/question/QuestionBoardList';
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

export default function BlogPost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tags, setTag] = useState<string[]>([]);
  const { category } = useParams();
  const api = useAPI();
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();

  const { accessToken, memberId } = useAppSelector((state) => state.loginInfo);
  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // const titleInput = () =>
  //   useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //     titleHandler(e);
  //   }, []); 대체 input re-rendering언제 할수있는지
  const contentHandler = (value: string) => {
    setContent(value);
  };

  // const addTag = (newTag: string) => {
  //   setTag((tag) => [...tag, newTag]);
  // };

  // const removeTag = (index: number) => {
  //   setTag((tag) => [...tag.slice(0, index), ...tag.slice(index + 1)]);
  // };
  let section = '';

  const submitHandler = () => {
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
    if (title.trim() === '') {
      alert('제목을 입력하세요.');
      return;
    }
    if (content.trim() === '') {
      alert('내용을 입력하세요.');
      return;
    }

    api
      .post('/blogs', {
        memberId,
        title,
        content,
        tags,
        category: section,
        image: '',
      })
      .then(function (response) {
        navigate(-1);
      })
      .catch(function (error) {
        //권한이 없습니다 띄우기
      });
  };
  const handleEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputArray = inputValue.split(',').map((item) => item.trim());

    setTag(inputArray);
  };
  return (
    <>
      <PostWrapper>
        <Input type="text" value={title} onChange={titleHandler} placeholder="제목" />
        <ResizeEditor width="70%" height="100%" quillRef={quillRef} htmlContent={content} setHtmlContent={setContent} />
        <input value={tags} onChange={handleEnter} placeholder="태그(중복선택시 쉼표(,)로 나눠주세요)" />
        {/* <TextInput type="category" setState={setTag} /> */}
        <MoveBtn onClick={submitHandler}>작성</MoveBtn>
        <Outlet />
      </PostWrapper>
    </>
  );
}
const ResizeEditor = styled(QuillEditor)`
  width: 20rem;
  max-width: 70%;
  background: white;
`;
