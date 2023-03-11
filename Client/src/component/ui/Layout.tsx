import React from 'react';
import Footer from '../Footer';
import Nav from '../Nav';

interface LayoutProps {
  children: string | JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};
