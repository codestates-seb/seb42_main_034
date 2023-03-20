import React from 'react';
import BoardList from '../../component/board/BoardList';
import Searchbar from '../../component/board/Searchbar';
import { Link, Outlet } from 'react-router-dom';
import SearchFilter from '../../component/board/SearchFilter';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const WrapperMain = styled.div`
  margin-top: 50px;
`;

const SearchMenu = styled.div`
  display: flex;
  align-items: center;
`;

const SearchbarWrapper = styled.div`
  margin-right: 1rem;
`;

const SearchFilterWrapper = styled.div`
  margin-left: auto;
`;

export default function QuestionList() {
  return (
    <>
      <Wrapper>
        <WrapperMain>
          <SearchMenu>
            <SearchbarWrapper>
              <Searchbar />
            </SearchbarWrapper>
            <SearchFilterWrapper>
              <SearchFilter />
            </SearchFilterWrapper>
          </SearchMenu>
          <Link to="/board/questionpost">글작성</Link>
          <BoardList />
        </WrapperMain>
      </Wrapper>
    </>
  );
}
