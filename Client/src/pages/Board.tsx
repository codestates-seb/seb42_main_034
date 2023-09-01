import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Slick from 'component/slider/Slider';
import { Colors, FontSize, ScreenSize } from 'component/style/variables';
import { BoxShadow } from 'component/style/cssTemplete';
import { Link } from 'react-router-dom';

const item = [
  {
    items: '/image/foodie.jpg',
  },
  {
    items:
      'https://images.unsplash.com/photo-1472393365320-db77a5abbecc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
];
export default function Board() {
  const { category } = useParams();

  return (
    <>
      <StyledSlick slidesToShow={1}>
        {/**캐러셀 리스트에만 보이게 하는곳 리팩토링 추후에필수로 하기 */}
        {category && item.map((el, idx) => <BackImg key={idx}></BackImg>)}
      </StyledSlick>
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
const BackImg = styled.div`
  background: ${Colors.main_03};
  height: 20rem;
  position: relative;
  width: 100%;
`;
const StyledSlick = styled(Slick)`
  margin-bottom: 2rem;
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
