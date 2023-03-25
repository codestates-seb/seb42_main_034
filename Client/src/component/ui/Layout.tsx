import React from 'react';
import styled, { css } from 'styled-components';
import Footer from '../footer/Footer';
import Nav from '../header/Nav';
import { Colors, ScreenSize } from '../style/variables';

const LayoutFlex = styled.div<React.ReactElement | any | never>`
  display: block;
  flex-direction: column;
  justify-content: center;

  background: ${Colors.main_01};
  max-height: ${ScreenSize.max_height};
  margin: auto;
`;
//Nav스타일 위치 바꿔야될듯 헷갈림ㅠ
const NavStyle = styled(Nav)<{ className: string }>`
  background: ${Colors.board_color};
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
export const MiddleLayout = styled.div`
  max-height: ${ScreenSize.middle_height};

  margin: auto;
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
