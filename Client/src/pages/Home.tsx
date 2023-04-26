import React, { useState } from 'react';

import styled from 'styled-components';
import { FontSize, ScreenSize } from '../component/style/variables';
import { Icon } from '../component/ui/Icon';
import { cities } from '../component/style/variables';
import { ReactComponent as MapIcon } from '../image/map.svg';
import Filter from './home/Filter';

//필터컴포넌트를 만들어서 해당 지역에 맞는 위치에 정적으로 만들기

export interface RegionInfo {
  city: string;

  url: string;
  content: string;
}
const ChangeFont = styled.div`
  font-size: ${FontSize.h2};
  text-align: center;
  margin-bottom: 3rem;
`;
export default function Home() {
  const [filter, setFilter] = useState('');

  return (
    //맵돌려서 집어넣기
    <>
      <ChangeFont>어디로 갈까요?</ChangeFont>
      <RelativeLayout>
        {/* <MapImg svg={<StyledMapIcon />} /> */}
        {cities.map((region, idx) => (
          <Filter key={idx} citys={region} setState={setFilter} filter={filter} />
        ))}
      </RelativeLayout>
    </>
  );
}

const RelativeLayout = styled.div`
  max-width: ${ScreenSize.max_width};
  margin: auto;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 30%);
  grid-auto-rows: 20rem;
  gap: 0.5em;
`;
