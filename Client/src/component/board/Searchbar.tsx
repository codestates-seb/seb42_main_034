import { useGetData } from 'api/data';
import { Relative } from 'component/style/cssTemplete';
import { Colors } from 'component/style/variables';
import { Button } from 'component/ui/Button';
import { Icon } from 'component/ui/Icon';
import React, { useState } from 'react';
import { BlogData, ListData, PageProps } from 'redux/boardDetails';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../image/search.svg';
type Data = [] | ListData[] | BlogData[];
export default function Searchbar({
  section,
  onCity,
  page,
  onPage,
}: {
  section: string;
  onCity: React.Dispatch<React.SetStateAction<any>>;
  page: PageProps;
  onPage: React.Dispatch<
    React.SetStateAction<{
      page: number;
      totalElements: number;
      totalPages: number;
      size: number;
    }>
  >;
}) {
  const [searchData, setSearchData] = useState('');
  const { getData } = useGetData();
  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //페이지함수 넣어야하는지 말아야하는지 모르겠음
    getData(searchData, section, page.page)
      .then((res) => {
        onCity(res.data.data);
      })
      .catch(console.error);
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
