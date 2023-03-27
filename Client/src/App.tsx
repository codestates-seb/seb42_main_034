import ScrollTop from 'component/ui/ScrollTop';
import React, { useEffect, useState } from 'react';

import { Outlet, useLocation } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Colors, ScreenSize } from './component/style/variables';
// import { theme } from './component/style/theme';

import { Layout } from './component/ui/Layout';

const FixOutletHeight = styled.div<{ landingPage?: string }>`
  min-height: ${ScreenSize.middle_height};
`;
export default function App() {
  const [showButton, setShowButton] = useState(false);
  const { pathname } = useLocation();
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    return null;
  };
  useEffect(() => {
    handleScroll();
  }, [pathname]);
  return (
    <Layout>
      <FixOutletHeight>
        <Outlet />
        <ScrollTop />
      </FixOutletHeight>
    </Layout>
  );
}
