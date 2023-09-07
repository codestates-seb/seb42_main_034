import { changeUrl } from 'api/changeUrl';
import { ReturnData, useSearch } from 'api/data';
import Searchbar from 'component/board/Searchbar';
import Page from 'component/Page';
import { Flex } from 'component/style/cssTemplete';
import useAPI from 'hooks/uesAPI';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BlogData, ListData } from 'redux/boardDetails';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';
interface RouteParams {
  id: string;
}
export default function QuestionList({ filter }: { filter: string }) {
  const [city, setCity] = useState<ListData[] | []>([]);
  const { category } = useParams() as { category: string };
  const [isLoding, setIsLoading] = useState(false);
  const api = useAPI();
  const search = useLocation().search.split('=');
  const searchData = decodeURIComponent(search[search.length - 1]);
  const { SearchText, searchTag } = useSearch();
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });
  // let section = '';
  const section = decodeURIComponent(category);
  useEffect(() => {
    //서치데이터 쿼리스트링 있으면 서치데이터 검색
    //1.검색결과일때
    setIsLoading(true);
    if (searchData && search[0] === '?search') {
      console.log(search[0]);

      console.log('서치데이터', changeUrl(searchData));
      SearchText('questions', changeUrl(searchData), pageNation.page, setCity, setPageNation);
    } else if (searchData && search[0] === '?tag') {
      //2.태그눌러서이동한결과일때
      searchTag(searchData, 'questions', pageNation.page, setCity, setPageNation);
    } else {
      const getData = async () => {
        const response: ReturnData = await api
          .get('questions', {
            params: {
              category: section,
              page: pageNation.page,
              sortedBy: 'default',
            },
          })
          .then((res) => res.data);
        setIsLoading(false);
        setCity(response.data);
        setPageNation(response.pageInfo);
      };

      getData().catch(console.error);
    }
  }, [filter, pageNation.page, searchData]);
  return (
    <>
      <Searchbar
        section="questions"
        onCity={setCity}
        page={pageNation}
        onPage={setPageNation}
        querystring={searchData}
      />
      <Contentbar>
        <>
          {' '}
          {isLoding && (
            <LoadingDiv>
              <LoadingTag src={`/image/loading.gif`} />
            </LoadingDiv>
          )}
        </>
        {city && city.map((city) => <QuestionCard city={city} key={city.questionId} />)}
      </Contentbar>
      {pageNation && <Page pages={pageNation} onPage={setPageNation} />}
    </>
  );
}
const BoardTap = styled.div`
  display: flex;
  div {
    margin-left: 0.9em;
  }
`;
const Contentbar = styled.ul`
  display: flex;
  flex-direction: column;
  min-height: 700px;
`;
const LoadingTag = styled.img`
  width: 4rem;
  height: 4rem;
`;
const LoadingDiv = styled.div`
  text-align: center;
`;
