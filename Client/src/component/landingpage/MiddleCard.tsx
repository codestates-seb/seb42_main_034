import MapContainer from 'component/Kakao.maps';
import { Flex } from 'component/style/cssTemplete';
import { FontSize } from 'component/style/variables';
import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
  font-size: ${FontSize.h1};
  text-align: center;
  margin-top: 10rem;
  margin: 2rem;
`;
export default function MiddleCard() {
  return (
    <div className="slide2 middle1">
      <Container>
        <div>다양한 지역에 있는 현지인들과 소통하세요!</div>
        <div>한번에 다양한 맛집 정보등을 확인 할 수 있습니다</div>
      </Container>
      <MapContainer className="middle2" intro={true} latitude={37.49140197082119} longitude={127.01760603543958} />
    </div>
  );
}
