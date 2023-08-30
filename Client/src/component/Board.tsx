import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, FontSize, ScreenSize } from './style/variables';
import { Absolute, BoxShadow } from './style/cssTemplete';
import Slick from 'component/slider/Slider';
import ScrollTop from 'component/ui/ScrollTop';
const item = [
  {
    items:
      'https://images.unsplash.com/photo-1681589436610-ee3b350e57d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
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
      <div>{category}</div>
      <StyledSlick slidesToShow={1} speed={8000}>
        {/**캐러셀 리스트에만 보이게 하는곳 리팩토링 추후에필수로 하기 */}
        {category &&
          item.map((el, idx) => (
            <BackImg url={el.items} key={idx}>
              <Absolute top={0} left={0}>
                어서오세요
              </Absolute>
            </BackImg>
          ))}
      </StyledSlick>
      <Layout>
        <Outlet />
        {/* <ScrollTop /> */}
      </Layout>
    </>
  );
}
const Modal = styled.div`
  width: 100%;
  background: rgba(227, 223, 223, 0.778);
  z-index: 8;
`;
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
  max-width: 90%;
  @media (min-width: 1400px) {
    max-width: 70%;
  }
  margin: auto;
  background: ${Colors.board_color} ${BoxShadow};
`;
const BackImg = styled.div<{ url: string }>`
  background-image: ${(props) => props.url && `url(${props.url})`};
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
  height: 20rem;
  position: relative;
  width: 100%;
`;
const StyledSlick = styled(Slick)`
  margin-bottom: 2rem;
  width: 100%;
`;
const Caresel = styled.div`
  color: ${Colors.button_blue};
`;
const Font = styled.div`
  font-size: ${FontSize.h1};
`;
