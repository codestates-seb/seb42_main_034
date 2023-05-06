// import React, { useState } from 'react';

// export default function Image() {
//     const [attachment, setAttachment] = useState();

//     const onFileChange = (e) => {
//       const {
//         target: {files},
//       } = e;
//       const theFile = files[0]; //우선 1개만 보여줄꺼니까 크기 1로 지정

//       //FileReader 객체 생성
//       const reader = new FileReader();

//       //로드될 때 result 가져오기
//       reader.onload = (finishedEvent) => {
//         const {
//           currentTarget: {result},
//         } = finishedEvent;
//         //불러온 결과(이미지)를 attachment에 넣기
//         setAttachment(result);
//       }
//       //파일 데이터를 URL로 변환하기
//       reader.readAsDataURL(theFile);
//     }

//     return(

//   <>

//           //파일 선택할 input창 (image파일만 불러오기)
//           <input type="file" accept="image/*" onChange={ onFileChange } />

//           //파일이 존재할 때만 미리보기 보여주기
//           { attachment && <img src={ attachment } width="50px" height="50px" /> }
//   </>
//     )
