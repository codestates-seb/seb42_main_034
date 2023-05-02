import React, { useState } from 'react';
import Editor from '@uiw/react-md-editor';
import styled from 'styled-components';

interface CommentEditorProps {
  onSubmit: (comment: string) => void;
}

const EditorWrapper = styled(Editor)`
  margin-top: 10px;
  border-radius: 5px;
  width: rem;
`;

export default function CommentEditor({ onSubmit }: CommentEditorProps) {
  const [value, setValue] = useState('');

  const handleChange = (value: string | undefined) => {
    setValue(value || '');
  };

  const handleSubmit = () => {
    onSubmit(value);
    setValue('');
  };

  return (
    <>
      <EditorWrapper value={value} onChange={handleChange} height={300} preview={'edit'} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
