import { Colors } from 'component/style/variables';
import { ButtonTheme, HoverAction } from 'component/style/cssTemplete';
import { NavButton } from 'component/ui/NavButton';
import { RegionInfo } from 'pages/Home';
import React from 'react';
import styled from 'styled-components';

const RegionButton = styled(NavButton)<{
  className: string;
}>`
  z-index: 0;
  /* ${ButtonTheme} */
  border: none;
  background: none;
  color: ${Colors.main_04_white};
  ${HoverAction}
  position: absolute;
`;

export default function Filter({
  citys,
  onClick,
}: {
  citys: RegionInfo;
  onClick: (route: string) => void | React.MouseEventHandler<HTMLButtonElement>;
}) {
  console.log(citys);

  return (
    <RegionButton
      text={citys.city}
      className=""
      onClick={onClick} //경로랑
      style={{ left: `${citys.x}em`, top: `${citys.y}em` }}
    />
  );
}
