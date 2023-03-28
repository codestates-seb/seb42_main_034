import { Relative } from 'component/style/cssTemplete';
import { Icon } from 'component/ui/Icon';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../image/search.svg';
// search icon 넣어야함
// cssssdda

const SearchWrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5em;
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
const ResizedIcon = styled(SearchIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;
const SearchBar = styled(Icon)`
  position: absolute;
  top: 0;
  left: 0;
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
    <SearchWrapper onSubmit={searchHandler}>
      <SearchInput type="text" value={searchData} onChange={searchInputHandler} />
      <Relative height="1rem" pb="0.4rem">
        <SearchBar svg={<ResizedIcon />} />
        <ResizedIcon />
      </Relative>
    </SearchWrapper>
  );
}
