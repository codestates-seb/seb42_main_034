// import React, { useState } from 'react';
// import { Form } from 'react-router-dom';
// import styled from 'styled-components';
// import { Button } from '../../component/ui/Button';
// import Editor from '../../component/ui/Editor';

// export const BlogPost = () => {
//   const [title, setTitle] = useState<string>('');
//   const [content, setContent] = useState<string>('');

//   const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTitle(e.target.value);
//   };

//   const contentHandler = (value: string) => {
//     setContent(value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//   };

//   const handleButtonClick = (event: React.MouseEvent) => {
//     console.log('button clicked', event);
//   };

//   const submitHandler = () => {
//     if (title.trim() === '') {
//       alert('제목을 입력하세요.');
//       return;
//     }
//     if (content.trim() === '') {
//       alert('내용을 입력하세요.');
//       return;
//     }
//     window.confirm('작성하시겠습니까?');
//   };

//   return (
//     <>
//       <PostContainer>
//         <Form onSubmit={handleSubmit}></Form>
//         <input value={title} onChange={handleTitleChange} />
//         <Editor onChange={contentHandler} value={content} />
//         <Button typeButton="submit" onClick={submitHandler}>
//           작성하기?
//         </Button>
//       </PostContainer>
//     </>
//   );
// };
// const PostContainer = styled.div`
//   display: flex;
//   align-items: center;
//   height: 50vh;
//   justify-content: center;
//   flex-direction: column;
// `;

// export default BlogPost;
