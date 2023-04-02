import { Relative } from 'component/style/cssTemplete';
import { Colors } from 'component/style/variables';
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
  left: 30%;
  width: 40%;
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  font-size: var(--font-size-md);
  padding: 10px;
  width: 100%;
  border-radius: 1rem;
  border: 5px solid ${Colors.main_02};
`;
const ResizedIcon = styled(SearchIcon)`
  width: 1.5rem;
  height: 1.5rem;
`;
const SearchBar = styled(Icon)`
  position: absolute;

  right: 1em;
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
      </Relative>
    </SearchWrapper>
  );
}
