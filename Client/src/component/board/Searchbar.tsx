import React, { useState } from 'react';
import styled from 'styled-components';

// search icon 넣어야함
// css

const SearchInput = styled.input`
  font-size: var(--font-size-md);
  padding: 10px;
  border-radius: 5px;
  border: 1px solid gray;
  width: 500px;
`;

export default function Searchbar() {
  const [searchData, setSearchData] = useState('');

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchData('');

    // data
  };
  return (
    <div>
      <form onSubmit={searchHandler}>
        <SearchInput type="text" value={searchData} onChange={searchInputHandler} />
      </form>
    </div>
  );
}
