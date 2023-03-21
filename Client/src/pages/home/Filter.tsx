import Button from 'component/board/Button';
import { Colors } from 'component/style/const';
import { ButtonTheme } from 'component/style/cssTemplete';
import { NavButton } from 'component/ui/NavButton';
import React from 'react';
import styled from 'styled-components';
const RegionButton = styled(NavButton)<{ className: string; text: string }>`
  z-index: 0;
  /* ${ButtonTheme} */
  border: none;
  background: none;
  color: ${Colors.main_04_white};
`;
interface RegionInfo{
    city:string,
    x:number,
    y:number
  }
export default function Filter() {
  return <RegionButton
  className=""
  text="서울"
  onClick={() => {
    console.log('dd');
  }}
}
