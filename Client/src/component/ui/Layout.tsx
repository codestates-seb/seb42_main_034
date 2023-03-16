import React from 'react';
import styled, { css } from 'styled-components';
import Footer from '../Footer';
import Nav from '../header/Nav';
import { Colors } from '../style/const';

const LayoutFlex = styled.div<JSX.Element | any | JSX.Element[] | never>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: ${Colors.main_01};
`;
//Nav스타일 위치 바꿔야될듯 헷갈림ㅠ
const NavStyle = styled(Nav)<{ className: string }>`
  background: ${Colors.main_04_white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom-left-radius: 0.4rem;
  border-bottom-right-radius: 0.4rem;
  padding: 0.2rem;
`;
interface LayoutProps {
  children: string | JSX.Element | JSX.Element[];
}
// theme
export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutFlex>
      <NavStyle className=" " />
      {children}
      <Footer />
    </LayoutFlex>
  );
};
