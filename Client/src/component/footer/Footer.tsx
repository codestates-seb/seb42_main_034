import React from 'react';
import styled from 'styled-components';
import { Logo } from '../header/Logo';
import { Colors, ScreenSize } from '../style/variables';
import SiteInfo from './SiteInfo';
const BottomLayout = styled.div`
  height: 20vh;
  background: ${Colors.main_04_white};
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  max-width: ${ScreenSize.max_width};
  margin: auto;
  padding: 0.5rem;
  margin-top: 3rem;
`;

export default function Footer() {
  return (
    <BottomLayout>
      <Logo />
      <SiteInfo />
    </BottomLayout>
  );
}