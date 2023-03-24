import { Relative } from 'component/style/cssTemplete';

import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { Colors, ScreenSize } from '../component/style/variables';
import { Icon } from '../component/ui/Icon';
import { cities } from '../component/style/variables';
import { ReactComponent as MapIcon } from '../image/map.svg';
import Filter from './home/Filter';

import { type } from '@testing-library/user-event/dist/type';
//필터컴포넌트를 만들어서 해당 지역에 맞는 위치에 정적으로 만들기

const MapImg = styled(Icon)`
  margin: auto;
  max-width: ${ScreenSize.max_width};
`;
const RelativeLayout = styled.div`
  ${Relative}
  max-width: ${ScreenSize.max_width};
  margin: auto;
`;

export interface RegionInfo {
  city: string;
  x: number;

  y: number;
}
export default function Home() {
  const [filter, setFilter] = useState('');

  return (
    //맵돌려서 집어넣기
    <RelativeLayout>
      <MapImg svg={<MapIcon />} />
      {cities.map((region, idx) => (
        <Filter key={idx} citys={region} setState={setFilter} filter={filter} />
      ))}
    </RelativeLayout>
  );
}
