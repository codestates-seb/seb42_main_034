import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Slick from 'component/slider/Slider';
import { Colors, FontSize, ScreenSize } from 'component/style/variables';
import { BoxShadow } from 'component/style/cssTemplete';
import { Link } from 'react-router-dom';
import QuestionCarousel from 'component/question/QuestionCarousel';

export default function Board() {
  const { category } = useParams();

  return (
    <>
      <RegionTab>
        {' '}
        <Link to="/home">지역선택 </Link>
      </RegionTab>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${ScreenSize.middle_height};
  min-width: 400px;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    padding: 4rem;
    width: 8px;
    height: 6px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  padding: 0.6rem 4em;
  border-radius: 0.7rem;
  max-width: 80%;
  @media (min-width: 1400px) {
    max-width: 70%;
  }
  margin: auto;
  background: ${Colors.board_color} ${BoxShadow};
`;

const RegionTab = styled.div`
  padding: 0 1.5rem;
  font-size: ${FontSize.h3};
  color: ${Colors.main_01};
  font-weight: bold;

  border: 5px ${Colors.main_01} solid;
  width: fit-content;
  border-radius: 0.7rem;
`;
const StyledSlick = styled(Slick)`
  margin-bottom: 2rem;
`;
const BackImg = styled.div`
  background: ${Colors.main_03};
  height: 10rem;
`;
