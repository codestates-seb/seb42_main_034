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

  useEffect(() => {
    const getData = async () => {
      const response: ReturnData = await api
        .get('questions', {
          params: {
            category,
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
