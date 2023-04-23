import { ReturnData } from 'api/data';
import Searchbar from 'component/board/Searchbar';
import Page from 'component/Page';
import useAPI from 'hooks/uesAPI';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogData, ListData } from 'redux/boardDetails';
import styled from 'styled-components';
import QuestionCard from './QuestionCard';

export default function QuestionList({ filter }: { filter: string }) {
  const [city, setCity] = useState<ListData[] | []>([]);
  const { category } = useParams();
  const api = useAPI();
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });
  let section = '';
  console.log(filter);

  useEffect(() => {
    if (category === '서울') {
      section = 'seoul';
    } else if (category === '경상') {
      section = 'kyungsang';
    } else if (category === '강원') {
      section = 'gangwon';
    } else if (category === '충청') {
      section = 'chungcheong';
    } else if (category === '부산') {
      section = 'busan';
    } else if (category === '제주') {
      section = 'jeju';
    } else if (category === '인천') {
      section = 'incheon';
    } else if (category === '울산') {
      section = 'ulsan';
    } else if (category === '전라') {
      section = 'Jeolla';
    } else if (category === '경기') {
      section = 'gyeonggi';
    }
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
  }, [filter, pageNation.page]);
  return (
    <>
      <Searchbar section="questions" onCity={setCity} page={pageNation} onPage={setPageNation} />
      <MainBoard>{city && city.map((city) => <QuestionCard city={city} key={city.questionId} />)}</MainBoard>
      {pageNation && <Page pages={pageNation} onPage={setPageNation} />}
    </>
  );
}
const MainBoard = styled.ul`
  flex: 1 1 auto;
`;
