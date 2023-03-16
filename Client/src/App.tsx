import React from 'react';

import { Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './component/style/theme';

import { Layout } from './component/ui/Layout';

const FixOutletHeight = styled.div`
  min-height: 1300px;
`;
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <FixOutletHeight>
          <Outlet />
        </FixOutletHeight>
      </Layout>
    </ThemeProvider>
  );
}
