import MapContainer from 'component/Kakao.maps';
import Item from 'component/slider/Item';
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
export default function MiddleCard() {
  return (
    <div>
      <Container>
        {/* <div>다양한 지역에 있는 현지인들과 소통하세요!</div>
        <div>한번에 다양한 맛집 정보등을 확인 할 수 있습니다</div> */}
        <div>Recommended popular destinations</div>
        <div className="font">현지인들에게 유명한 장소들을 추천 받아보세요!</div>
      </Container>
      <Item />
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
