import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 20rem;
  text-align: center;
`;

const Tag = styled.span`
  font-size: 12px;
  margin: 10px 5px;
`;

const Button = styled.button`
  margin-left: 5px;
`;

type TagInputProps = {
  tag: string[];
  addTag: (newTag: string) => void;
  removeTag: (index: number) => void;
};

export default function Tags({ tag, addTag, removeTag }: TagInputProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();

    if (e.key === 'Enter' && value !== '') {
      if (tag.length >= 2) {
        window.confirm('태그는 2개까지 작성할 수 있습니다.');
        return;
      }
      addTag(`#${value}`);
      setInputValue('');
    }
  };
  return (
    <div>
      <Input
        type="text"
        placeholder="태그를 입력하세요. ( 예: 바다, 제주 )"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleInputKeyDown}
      ></Input>
      <div>
        {tag.map((tag, index) => (
          <Tag key={index}>
            {tag}
            <Button onClick={() => removeTag(index)}>삭제</Button>
          </Tag>
        ))}
      </div>
    </div>
  );
}
