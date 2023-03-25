import React from 'react';

import { Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Colors, ScreenSize } from './component/style/variables';
// import { theme } from './component/style/theme';

import { Layout } from './component/ui/Layout';

const FixOutletHeight = styled.div<{ landingPage?: string }>`
  min-height: ${ScreenSize.middle_height};
`;
export default function App() {
  return (
    <Layout>
      <FixOutletHeight>
        <Outlet />
      </FixOutletHeight>
    </Layout>
  );
}
