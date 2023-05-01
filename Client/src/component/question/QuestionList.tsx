import { changeUrl } from 'api/changeUrl';
import { ReturnData, useSearch } from 'api/data';
import Searchbar from 'component/board/Searchbar';
import Page from 'component/Page';
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
    // if (category === '서울') {
    //   section = 'seoul';
    // } else if (category === '경상') {
    //   section = 'kyungsang';
    // } else if (category === '강원') {
    //   section = 'gangwon';
    // } else if (category === '충청') {
    //   section = 'chungcheong';
    // } else if (category === '부산') {
    //   section = 'busan';
    // } else if (category === '제주') {
    //   section = 'jeju';
    // } else if (category === '인천') {
    //   section = 'incheon';
    // } else if (category === '울산') {
    //   section = 'ulsan';
    // } else if (category === '전라') {
    //   section = 'Jeolla';
    // } else if (category === '경기') {
    //   section = 'gyeonggi';
    // }
    console.log(city);

    if (searchData && search[0] === '?search') {
      //서치데이터 쿼리스트링 있으면 서치데이터 검색
      console.log('서치데이터', changeUrl(searchData));
      SearchText('questions', changeUrl(searchData), pageNation.page, setCity, setPageNation);
    } else if (searchData) {
      searchTag(searchData, 'questions', pageNation.page, setCity, setPageNation);
    }
    {
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

        setCity(response.data);
        setPageNation(response.pageInfo);
      };

      getData().catch(console.error);
    }
  }, [filter, pageNation.page]);
  return (
    <>
      <Searchbar
        section="questions"
        onCity={setCity}
        page={pageNation}
        onPage={setPageNation}
        querystring={searchData}
      />
      <MainBoard>{city && city.map((city) => <QuestionCard city={city} key={city.questionId} />)}</MainBoard>
      {pageNation && <Page pages={pageNation} onPage={setPageNation} />}
    </>
  );
}
const MainBoard = styled.ul`
  flex: 1 1 auto;
  padding-left: 0px;
`;
