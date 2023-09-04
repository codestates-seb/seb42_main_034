import { BlogReturnData, ReturnData, useSearch } from 'api/data';
import Searchbar from 'component/board/Searchbar';
import Page from 'component/Page';
import { HoverAction } from 'component/style/cssTemplete';
import useAPI from 'hooks/uesAPI';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BlogData } from 'redux/boardDetails';
import styled from 'styled-components';
import BlogCard from './BlogCard';

export default function BlogList({ filter }: { filter: string }) {
  const [city, setCity] = useState<BlogData[] | []>([]);
  const api = useAPI();
  const { SearchText } = useSearch();
  const { category } = useParams() as { category: string };
  const section = decodeURIComponent(category);
  const search = useLocation().search.split('=');
  console.log(search);
  //enceded된 특문 -> 한국어로 변형
  const searchData = decodeURIComponent(search[search.length - 1]);
  const [pageNation, setPageNation] = useState({
    page: 1,
    totalElements: 0,
    totalPages: 0,
    size: 15,
  });

  useEffect(() => {
    if (searchData) {
      //서치데이터 쿼리스트링 있으면 서치데이터 검색
      SearchText(section, searchData, pageNation.page, setCity, setPageNation).then((res) => {
        console.log(res);
      });
    } else {
      const getData = async () => {
        const response: BlogReturnData = await api
          .get('blogs', {
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
      {' '}
      <Searchbar section="blogs" onCity={setCity} page={pageNation} onPage={setPageNation} querystring={searchData} />
      <MainBoard>
        {city.length > 0 ? (
          category && city.map((city) => <BlogCard city={city} key={city.blogId} region={category} />)
        ) : (
          <div className="nonePost">게시물이 없습니다😂. 첫 블로그를 작성해보시겠어요?</div>
        )}
      </MainBoard>
      {pageNation && <Page pages={pageNation} onPage={setPageNation} />}
    </>
  );
}
const MainBoard = styled.ul`
  display: grid;

  grid-template-columns: repeat(3, 33.3%);
  grid-auto-rows: 30rem;
  gap: 0.5em;
  padding-left: 0px;
  min-height: 700px;
  .nonePost {
    width: 700px;
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 50%);
  }
`;
