import { Colors } from 'component/style/variables';
import { BoxShadow, ButtonTheme, HoverAction } from 'component/style/cssTemplete';
import { RegionInfo } from 'pages/Home';
import React from 'react';
import styled from 'styled-components';
import { Button } from 'component/ui/Button';

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
  onClick,
}: {
  citys: RegionInfo;
  onClick: (route: string, region?: string) => void;
  region?: string;
}): JSX.Element {
  console.log(citys);

  return (
    <RegionButton
      children={citys.city}
      className=""
      onClick={() => {
        onClick(`/board/questionlist`);
      }} //경로랑
      style={{ left: `${citys.x}em`, top: `${citys.y}em` }}
    />
  );
}
