import React, { useRef, useState } from 'react';
import QuillEditor from 'component/ui/QuillEditor';
import ReactQuill from 'react-quill';
import TextInput from 'component/ui/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetData } from 'api/data';
import { MoveBtn } from 'pages/question/QuestionBoardList';

export default function ModifyBlog() {
  /**1. 기존 data get
   * 2. 제목, 이미지, 내용 수정
   * 3. 수정 하면 patch이용하여 수정
   * 4. 뒤로 -1
   */
  const { putBoardData, getBoardData } = useGetData();
  const quillRef = useRef<ReactQuill>(null);
  const navigate = useNavigate();

  const data = useLocation().state; //타입지정해서 들어오는 방법 찾기

  const [title, setTitle] = useState<string>(data.detail.title || '');
  const [content, setContent] = useState<string>(data.detail.content || '');
  const [tags, setTags] = useState<string[]>(data.detail.tags);
  const handlePatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await putBoardData('blogs', data.data.blogId, { title, content, tags, image: null });
    navigate(-1);
  };
  const handleEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputArray = inputValue.split(',').map((item) => item.trim());
    console.log(inputValue.split(','));

    setTags(inputArray);
  };
  return (
    <div>
      <TextInput type="patchInput" setState={setTitle} value={title} placeholder="제목" />
      <QuillEditor width="100%" height="100%" quillRef={quillRef} htmlContent={content} setHtmlContent={setContent} />
      <input onChange={handleEnter} value={tags} placeholder="태그" />
      <form onSubmit={handlePatch}>
        <MoveBtn children="수정" />
      </form>
    </div>
  );
}
