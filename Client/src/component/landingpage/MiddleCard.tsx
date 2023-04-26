import MapContainer from 'component/Kakao.maps';
import Item, { itemsProps } from 'component/slider/Item';
import Slick from 'component/slider/Slider';
import { Flex } from 'component/style/cssTemplete';
import { FontSize } from 'component/style/variables';
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  font-size: ${FontSize.h2};
  text-align: center;
  margin-top: 10rem;
  margin: 2rem;
  .font {
    opacity: 0.8;
    font-size: ${FontSize.sm};
    margin-top: 2em;
  }
`;
const items: itemsProps[] = [
  {
    items:
      'https://images.unsplash.com/photo-1597552661064-af143a5f3bee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    name: 'Seoul',
  },
  {
    items:
      'https://images.unsplash.com/photo-1575907794679-016b6bd90285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80',
    name: 'Busan',
  },
  {
    items:
      'https://images.unsplash.com/photo-1591688795017-4f31784362ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    name: 'Gangneung',
  },
  {
    items:
      'https://images.unsplash.com/photo-1634131484642-887b96daac15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
    name: 'Incheon',
  },
  {
    items:
      'https://images.unsplash.com/photo-1606739669974-ced280212a14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80',
    name: 'Jeonju',
  },
];

export default function MiddleCard() {
  return (
    <div>
      <Container>
        {/* <div>다양한 지역에 있는 현지인들과 소통하세요!</div>
        <div>한번에 다양한 맛집 정보등을 확인 할 수 있습니다</div> */}
        <div>Recommended popular destinations</div>
        <div className="font">현지인들에게 유명한 장소들을 추천 받아보세요!</div>
      </Container>
      <StyledSlick>
        {items.map((el, idx) => (
          <Item item={el} />
        ))}
      </StyledSlick>
      {/* <MapContainer
        width={900}
        height={600}
        className="middle1"
        intro={true}
        latitude={37.49140197082119}
        longitude={127.01760603543958}
      /> */}
    </div>
  );
}

const StyledSlick = styled(Slick)``;
