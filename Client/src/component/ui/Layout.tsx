import React from 'react';
import styled, { css } from 'styled-components';
import Footer from '../Footer';
import { Nav } from '../header/Nav';
import { Colors } from '../style/const';

// export const Flex = css` 많이 겹치면 사용해보기
//   display: flex;
//   flex-direction: column;
// `;
const LayoutFlex = styled.div<JSX.Element | any | JSX.Element[] | never>`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const NavStyle = styled(Nav)`
  flex: 1 1 au;
`;
interface LayoutProps {
  children: string | JSX.Element | JSX.Element[];
}
// theme
export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutFlex>
      <NavStyle />
      {children}
      <Footer />
    </LayoutFlex>
  );
};
