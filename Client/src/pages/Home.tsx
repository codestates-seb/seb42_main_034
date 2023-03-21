import { CRUDdata, ReturnData } from 'api/data';
import { Relative } from 'component/style/cssTemplete';
import { NavButton } from 'component/ui/NavButton';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, ScreenSize } from '../component/style/variables';
import { Icon } from '../component/ui/Icon';
import { cities } from '../component/style/variables';
import { ReactComponent as MapIcon } from '../image/map.svg';
import Filter from './home/Filter';
import { useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';
//필터컴포넌트를 만들어서 해당 지역에 맞는 위치에 정적으로 만들기

const MapImg = styled(Icon)<{ svg: React.ReactNode }>`
  margin: auto;
  max-width: ${ScreenSize.max_width};
`;
const RelativeLayout = styled.div`
  ${Relative}
  max-width: ${ScreenSize.max_width};
  margin: auto;
`;
class Type {}
export interface RegionInfo {
  city: string;
  x: number;

  y: number;
}
type citi = RegionInfo;
export default function Home() {
  const [dataa, setData] = useState({});
  const dd = new CRUDdata();
  dd.getData().then(console.log).catch(console.error);
  const navigate = useNavigate();
  const handleBtnClick = (route: string) => {
    //해당지역으로이동
    dd.getData()
      .then((res) => {
        navigate(route, { state: { res } });
      })
      .catch(console.error);

    //getData(카테고리)
  };
  return (
    //맵돌려서 집어넣기
    <RelativeLayout>
      <MapImg svg={<MapIcon />} />
      {cities.map((region, idx) => (
        <Filter key={idx} citys={region} onClick={handleBtnClick} />
      ))}
      {/* <Filter city="서울" x={36.5} y={15} onClick={handleBtnClick} /> */}
    </RelativeLayout>
  );
}
