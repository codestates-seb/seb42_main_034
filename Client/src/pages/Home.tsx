import { ReturnData } from 'api/data';
import { Relative } from 'component/style/cssTemplete';
import { NavButton } from 'component/ui/NavButton';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, ScreenSize } from '../component/style/const';
import { Icon } from '../component/ui/Icon';
import { cities } from '../component/style/const';
import { ReactComponent as MapIcon } from '../image/map.svg';
import Filter from './home/Filter';
//필터컴포넌트를 만들어서 해당 지역에 맞는 위치에 정적으로 만들기

const MapImg = styled(Icon)<{ svg: React.ReactNode }>`
  margin: auto;
  max-width: ${ScreenSize.max_width};
`;
const RelativeLayout = styled.div`
  ${Relative}
`;
export interface RegionInfo {
  city: string;
  x: number;

  y: number;
}

export default function Home() {
  const navigate = useNavigate();
  const handleBtnClick = (route: string, data: ReturnData) => {
    //해당지역으로이동
    navigate(route, { state: { data } });
    //getData(카테고리)
  };
  return (
    //맵돌려서 집어넣기
    <RelativeLayout>
      <MapImg svg={<MapIcon />} />
      {/* {cities.map((region) => (
        <Filter region={region} />
      ))} */}
      <Filter city="서울" x={34} y={56} />
    </RelativeLayout>
  );
}
