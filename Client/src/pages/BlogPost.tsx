import React, { useRef, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useAppSelector } from 'redux/hooks';

import QuillEditor from 'component/ui/QuillEditor';
import ReactQuill from 'react-quill';
import { MoveBtn } from 'pages/QuestionBoardList';
import useAPI from 'hooks/uesAPI';
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
  const { category } = useParams() as { category: string };
  const api = useAPI();
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();
  const [image, setImage] = useState<string>('');
  const { accessToken, memberId } = useAppSelector((state) => state.loginInfo);
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
    if (tags.length === 0) {
      alert('태그를 입력하세요.');
      return;
    }
    api
      .post('/blogs', {
        memberId,
        title,
        content,
        tags,
        category,
        image,
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
        <ResizeEditor
          setImage={setImage}
          width="70%"
          height="100%"
          quillRef={quillRef}
          htmlContent={content}
          setHtmlContent={setContent}
        />
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

  background: white;
`;
