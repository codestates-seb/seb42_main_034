import { Relative } from 'component/style/cssTemplete';
import { Colors } from 'component/style/variables';
import { Button } from 'component/ui/Button';
import { Icon } from 'component/ui/Icon';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../image/search.svg';

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
        <SearchBtn children={<SearchBar svg={<ResizedIcon />} />} />
      </Relative>
    </SearchWrapper>
  );
}
const SearchInput = styled.input`
  font-size: var(--font-size-md);
  padding: 10px;
  width: 60%;
  border-radius: 1rem;
  border: 5px solid ${Colors.main_02};
  height: 12%;
  margin: 1em;
`;
const ResizedIcon = styled(SearchIcon)`
  width: 1.3em;
  height: 1.3em;
`;
const SearchBar = styled(Icon)`
  position: absolute;
  top: 1.5em;
  right: 1.5em;
`;
const SearchWrapper = styled.form`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    display: none;
  }
`;
const SearchBtn = styled(Button)`
  background: none;
  border: none;
  position: absolute;
  top: 0.6em;
  right: 1em;
`;
