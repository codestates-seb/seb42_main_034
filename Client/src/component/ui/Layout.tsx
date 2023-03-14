import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import Nav from '../Nav';
const LayoutFlex = styled.div`
  ${({ theme }) => theme.media.desktop`
    display:flex;
    flex-direction:column;
    align-items:start;
    height:100vh;
  `}
`;

interface LayoutProps {
  children: string | JSX.Element | JSX.Element[];
}
// theme
export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutFlex>
      <Nav />
      {children}
      <Footer />
    </LayoutFlex>
  );
};
