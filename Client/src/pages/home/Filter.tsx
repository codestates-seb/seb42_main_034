import Button from 'component/board/Button';
import { Colors } from 'component/style/const';
import { ButtonTheme, HoverAction } from 'component/style/cssTemplete';
import { NavButton } from 'component/ui/NavButton';
import { RegionInfo } from 'pages/Home';
import React, { useState } from 'react';
import styled from 'styled-components';
const RegionButton = styled(NavButton)<{
  className: string;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}>`
  z-index: 0;
  /* ${ButtonTheme} */
  border: none;
  background: none;
  color: ${Colors.main_04_white};
  ${HoverAction}
  position: absolute;
`;

export default function Filter(city: RegionInfo) {
  const [xy, setXY] = useState({ x: 0, y: 0 });
  return (
    <RegionButton
      text={city.city}
      className=""
      onClick={() => {
        console.log('dd');
      }}
      style={{ left: `${city.x}px`, top: `${city.y}px` }}
    />
  );
}
