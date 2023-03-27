import { Colors } from 'component/style/variables';
import { BoxShadow, ButtonTheme, HoverAction } from 'component/style/cssTemplete';
import { RegionInfo } from 'pages/Home';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';
import { CRUDdata, ReturnData } from 'api/data';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const RegionButton = styled(Button)`
  z-index: 0;
  /* ${ButtonTheme} */
  border: none;
  background: ${Colors.main_02};
  color: ${Colors.main_04_white};
  ${HoverAction}
  ${BoxShadow}
  position: absolute;
  font-size: 1.3rem;
  border-radius: 1.7rem;
  padding: 0.5rem;
  padding-top: 0.6rem;
`;

export default function Filter({
  citys,
  setState,
  filter,
}: {
  citys: RegionInfo;
  region?: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
}): JSX.Element {
  const dd = new CRUDdata();
  // dd.getData().then(console.log).catch(console.error);
  const navigate = useNavigate();

  const handleBtnClick = (route: string, region?: string) => {
    //해당지역으로이동
    setState(citys.city);
    dd.getData() // 인자로 지역이름 집어넣기
      .then((res) => {
        console.log('tjdrhd');
        console.log(res);
      })
      .then((res) => {
        navigate(route, { state: res });
      })
      .catch(console.error);
  };
  return (
    <RegionButton
      children={citys.city}
      className=""
      onClick={() => {
        handleBtnClick(`/board/questionlist`);
      }} //경로랑
      style={{ left: `${citys.x}em`, top: `${citys.y}em` }}
    />
  );
}