import Button, { ButtonWrapper } from 'component/board/Button';
import { ButtonTheme } from 'component/style/cssTemplete';
import React from 'react';
import styled from 'styled-components';
import Nav from '../component/header/Nav';
import MapContainer from '../component/Kakao.maps';
import { Colors, ScreenSize } from '../component/style/const';
import { Icon } from '../component/ui/Icon';
import { NavButton } from '../component/ui/NavButton';
import { ReactComponent as MapIcon } from '../image/map.svg';
//필터컴포넌트를 만들어서 해당 지역에 맞는 위치에 정적으로 만들기
const MapImg = styled(Icon)<{ svg: React.ReactNode }>`
  margin: auto;
  max-width: ${ScreenSize.max_width};
`;
const RegionButton = styled(NavButton)<{ className: string; text: string }>`
  z-index: 0;
  /* ${ButtonTheme} */
  border: none;
  background: none;
  color: ${Colors.main_04_white};
`;
export default function Home() {
  return (
    <div>
      <MapImg svg={<MapIcon />} />
      <RegionButton
        className=""
        text="서울"
        onClick={() => {
          console.log('dd');
        }}
      />
      <ButtonWrapper
        onClick={() => {
          console.log('ddd');
        }}
      />
    </div>
  );
}
