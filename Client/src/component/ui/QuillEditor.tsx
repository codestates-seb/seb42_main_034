import React, { Dispatch, SetStateAction, useRef } from 'react';
import { memo, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// props 타입정의
type QuillEditorProps = {
  quillRef: any;
  htmlContent: string;
  setHtmlContent: Dispatch<SetStateAction<string>>;
  width: string;
  height: string;
};

const QuillEditor = memo(({ quillRef, htmlContent, setHtmlContent, width, height }: QuillEditorProps) => {
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
        theme="snow"
        style={{ height, width, marginBottom: '6%' }} // style
        {...quillOptions}
      />
    </>
  );
});

export default QuillEditor;
