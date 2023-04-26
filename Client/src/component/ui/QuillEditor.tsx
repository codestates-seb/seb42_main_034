import React, { Dispatch, SetStateAction, useRef } from 'react';
import { memo, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AWS, { S3 } from 'aws-sdk';
import { uploadImageToS3 } from 'api/imageUpload';
// props 타입정의
type QuillEditorProps = {
  quillRef: any;
  htmlContent: string;
  setHtmlContent: Dispatch<SetStateAction<string>>;
  width: string;
  height: string;
  imgHandler?: any;
};

const QuillEditor = memo(({ quillRef, htmlContent, setHtmlContent, width, height, imgHandler }: QuillEditorProps) => {
  // Function to handle image uploads to S3

  const modules = useMemo(
    () => ({
      toolbar: {
        // 툴바에 넣을 기능
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['image', 'video'],
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          image: imgHandler,
        },
      },
    }),
    [],
  );

  const quillOptions = {
    // configure the options for react-quill
    // disable HTML tags by setting "sanitize" to false
    // and "stripTags" to true
    sanitize: false,
    stripTags: true,
  };
  const getTextWithoutTags = (html: string) => {
    const regex = /(<([^>]+)>)/gi;
    return html.replace(regex, '');
  };
  return (
    <>
      <ReactQuill
        // ref={quillRef}
        ref={(element) => {
          if (element !== null) {
            quillRef.current = element;
          }
        }}
        value={htmlContent}
        onChange={setHtmlContent}
        modules={modules}
        formats={['image']}
        theme="snow"
        style={{ height, width, marginBottom: '6%' }} // style
        {...quillOptions}
      />
    </>
  );
});

export default QuillEditor;
