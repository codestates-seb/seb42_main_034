import React, { Dispatch, SetStateAction } from 'react';
import { memo, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadToS3 } from 'api/imageUpload';
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
  // eslint-disable-next-line @typescript-eslint/require-await
  const imageHandlerr = async () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    fileInput.click();
    // const img = document.querySelector('.ql-editor img:last-child') as HTMLImageElement;

    // const editor = document.querySelector('.ql-editor') as HTMLDivElement;
    // const maxWidth = editor ? editor.offsetWidth : 0;
    // const naturalWidth = img.naturalWidth;
    // const naturalHeight = img.naturalHeight;
    // const aspectRatio = naturalHeight / naturalWidth;
    // img.style.maxWidth = maxWidth + 'px';
    // img.style.width = '100%';
    // img.style.height = `${maxWidth * aspectRatio}px`;
    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];

      if (!file) {
        return;
      }

      const url = await uploadToS3(file);
      console.log(url);
      const range = quillRef.current?.getEditor().getSelection()?.index || 0;
      quillRef.current?.getEditor().insertEmbed(range, 'image', url);
      // if (img) {
      //   // Set the image width and height to fit within the editor

      //   const editor = document.querySelector('.ql-editor') as HTMLDivElement;
      //   const maxWidth: number = editor ? editor.offsetWidth : 0;
      //   const naturalWidth: number = img.naturalWidth;
      //   const naturalHeight: number = img.naturalHeight;
      //   const aspectRatio: number = naturalHeight / naturalWidth;
      //   img.style.maxWidth = maxWidth + 'px';
      //   img.style.width = '50%';
      //   img.style.height = `${maxWidth * aspectRatio}px`;
      // }
    };
  };

  React.useEffect(() => {
    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule('toolbar');
      toolbar.addHandler('image', imageHandlerr);
    }
  }, [quillRef]);
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
          image: imageHandlerr,
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
        style={{ height, width, marginBottom: '6%', maxWidth: '90%' }} // style
        {...quillOptions}
      />
    </>
  );
});

export default QuillEditor;
