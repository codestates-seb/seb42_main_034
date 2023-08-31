import { getFilterData, useSearch } from 'api/data';
import { Colors, FontSize } from 'component/style/variables';
import React, { useState, KeyboardEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Input = styled.input`
  width: 20rem;
  text-align: center;
`;

const Button = styled.button`
  margin-left: 5px;
`;

type TagInputProps = {
  tag: string[];
  addTag: (newTag: string) => void;
  removeTag: (index: number) => void;
};

export default function Tag({ section, text, region }: { section: string; text: string; region: string | undefined }) {
  const textRef = useRef<HTMLButtonElement>(null);
  const { searchTag } = useSearch();
  const navigate = useNavigate();

  const handleSearch = () => {
    /**1.전페이지로 이동
     * 2. search한 내용을 querystirng으로 받아올수있으면 서치태그에 집어 넣어서 검 색
     * 3. 질문인지 블로그인지 태그에 받고 페이지네이션
     
    */
    console.log(section.slice(0, -1));

    const searchText = textRef.current?.innerText.slice(1);
    // searchTag(searchText, section, 1,);
    navigate(`/board/boardlist/${section}/${region}?tag=${searchText}`);
  };
  return <StyledTagBtn onClick={handleSearch} ref={textRef} children={`#${text}`} />;
}
const StyledTagBtn = styled(Button)`
  border: none;
  background: none;
  color: ${Colors.main_01};
  font-size: ${FontSize.h3};
  font-weight: bold;
  &:hover {
    border-bottom: 2px solid ${Colors.main_01};
    cursor: pointer;
  }
`;
