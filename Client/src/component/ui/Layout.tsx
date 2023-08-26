import React from 'react';
import styled from 'styled-components';
import Footer from '../footer/Footer';
import Nav from '../header/Nav';
import { Colors, ScreenSize } from '../style/variables';

const NavStyle = styled(Nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${Colors.main_01};
  padding: 0.4rem;
  width: 100%;
  box-shadow: 0px 6px rgba(241, 231, 231, 0.39);
`;
export const MiddleLayout = styled.div`
  max-height: ${ScreenSize.middle_height};

  margin: auto;
`;
export interface LayoutProps {
  children: string | React.ReactElement;
}
// theme
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <NavStyle />
      {children}
      <Footer />
    </>
  );
};
