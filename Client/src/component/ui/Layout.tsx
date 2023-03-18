import React from 'react';
import styled, { css } from 'styled-components';
import Footer from '../footer/Footer';
import Nav from '../header/Nav';
import { Colors, ScreenSize } from '../style/const';

const LayoutFlex = styled.div<React.ReactElement | any | never>`
  display: block;
  flex-direction: column;
  justify-content: center;
  background: ${Colors.main_01};
  min-height: 1400px;
  margin: auto;
`;
//Nav스타일 위치 바꿔야될듯 헷갈림ㅠ
const NavStyle = styled(Nav)<{ className: string }>`
  background: ${Colors.main_04_white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  padding: 0.4rem;
  max-width: ${ScreenSize.max_width};
  margin: auto;
  margin-bottom: 4rem;
`;
interface LayoutProps {
  children: string | React.ReactElement;
}
// theme
export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutFlex>
      <NavStyle className="" />
      {children}
      <Footer />
    </LayoutFlex>
  );
};
