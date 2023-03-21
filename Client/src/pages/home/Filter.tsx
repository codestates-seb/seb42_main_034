import { Colors } from 'component/style/variables';
import { BoxShadow, ButtonTheme, HoverAction } from 'component/style/cssTemplete';
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
  background: ${Colors.main_02};
  color: ${Colors.main_04_white};
  ${HoverAction}
  ${BoxShadow}
  position: absolute;
  font-size: 1.3rem;
  border-radius: 1.7rem;
  padding: 0.5rem;
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
