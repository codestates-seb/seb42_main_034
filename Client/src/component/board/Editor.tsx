import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import styled from 'styled-components';

interface Editors {
  value: string;
  onChange: (value: string) => void;
}

const EditorWrapper = styled(MDEditor)`
  margin-top: 10px;
  border-radius: 5px;
  width: 50rem;
`;

export default function Editor(props: Editors) {
  const { value, onChange } = props;

  const handleChange = (value: string | undefined) => {
    onChange(value || '');
  };

  return <EditorWrapper value={value} onChange={handleChange} height={300} preview={'edit'} />;
}
