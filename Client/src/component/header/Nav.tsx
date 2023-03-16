import React from 'react';
import { Logo } from './Logo';
import { Props } from '../header/Logo';
import UserTab from './UserTab';
import styled from 'styled-components';
import { HoverAction } from '../style/cssTemplete';
const LogoHoverAction = styled(Logo)<{ className: string }>`
  ${HoverAction}
  background: black;
`;
export default function Nav({ className }: Props) {
  return (
    <div className={className}>
      <LogoHoverAction className="" />
      <UserTab />
    </div>
  );
}
