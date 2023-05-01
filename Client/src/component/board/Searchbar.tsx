import { changeUrl } from 'api/changeUrl';
import { useGetData, useSearch } from 'api/data';
import { Relative } from 'component/style/cssTemplete';
import { Colors } from 'component/style/variables';
import { Button } from 'component/ui/Button';
import { Icon } from 'component/ui/Icon';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BlogData, ListData, PageProps } from 'redux/boardDetails';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../../image/search.svg';
type Data = [] | ListData[] | BlogData[];
export default function Searchbar({
  section,
  onCity,
  page,
  onPage,
  querystring,
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
  querystring?: string;
}) {
  const [searchData, setSearchData] = useState(querystring || '');
  const { getData } = useGetData();
  const data = useLocation();
  console.log(data);
  const navigate = useNavigate();
  const search = useLocation().search.split('=');
  const { searchTag, SearchText } = useSearch();
  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(changeUrl(e.target.value));
  };
  const { category } = useParams();

  useEffect(() => {
    //서치데이터일때
    if (querystring) {
      setSearchData(changeUrl(querystring));
      SearchText(section, changeUrl(querystring), page.page, onCity, onPage).then((res) => {
        console.log(res);
      });
    }
  }, []);

  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //페이지함수 넣어야하는지 말아야하는지 모르겠음

    SearchText(section, decodeURIComponent(searchData), page.page, onCity, onPage)
      .then((res) => {
        // onCity(res.data.data);
        console.log(res);
        navigate(`/board/boardlist/${section}/${category}?search=${searchData}`);
      })
      .catch(console.error);
  };
  //없애면 전체검색
  return (
    <SearchWrapper onSubmit={searchHandler}>
      <SearchInput type="text" value={searchData} onChange={searchInputHandler} />
      {search[0] === '?tag' && (
        <Tag>
          ddd
          <TagBtn
            children="x"
            onClick={() => {
              navigate(`/board/boardlist/questions/${category}`);
              setSearchData('');
            }}
          ></TagBtn>
        </Tag>
      )}
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
  border-radius: 0.4rem;
  border: 2px solid ${Colors.main_02};
  height: 12%;
  margin: 1em;
`;
const ResizedIcon = styled(SearchIcon)`
  width: 1.3em;
  height: 1.3em;
`;
const SearchBar = styled(Icon)`
  position: absolute;
  top: 1.2em;
  right: 1.5em;
  cursor: pointer;
`;
const SearchWrapper = styled.form`
  display: flex;
  position: relative;
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
const Tag = styled.div`
  border: 1px solid ${Colors.main_01};
  position: absolute;
  top: 1.1em;
  left: 9em;
  padding: 0.3em;
  background: ${Colors.main_02};
  border-radius: 0.3em;
`;
const TagBtn = styled(Button)`
  border: none;
  background: none;
  font-size: 1rem;
`;
