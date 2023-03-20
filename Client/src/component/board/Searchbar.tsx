import React, { useState } from 'react';
import styled from 'styled-components';

// search icon 넣어야함
// css

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SearchInput = styled.input`
  font-size: var(--font-size-md);
  padding: 10px;
  width: 40rem;
  border-radius: 5px;
  border: 1px solid gray;
`;

export default function Searchbar() {
  const [searchData, setSearchData] = useState('');

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchData('');
  };
  return (
    <SearchWrapper>
      <form onSubmit={searchHandler}>
        <SearchInput type="text" value={searchData} onChange={searchInputHandler} />
      </form>
    </SearchWrapper>
  );
}
