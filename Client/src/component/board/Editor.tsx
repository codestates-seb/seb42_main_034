import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

interface Editors {
  value: any;
  onChange: any;
  name?: string;
}

const EditorWrapper = styled(MDEditor)<{ name?: string }>`
  margin-top: 10px;
  border-radius: 5px;
  width: 50rem;
  margin: auto;
  height: 40rem;
`;

export default function Editor(props: Editors) {
  const { value, onChange, name } = props;

  const handleChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return <EditorWrapper name={name} value={value} onChange={handleChange} height={300} preview={'edit'} />;
}
