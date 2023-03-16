import React from 'react';

import { Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './component/style/theme';

import { Layout } from './component/ui/Layout';
const FixOutletHeight = styled(Outlet)<{ className: string }>`
  flex: 1 1 auto;
  color: pink;
`;
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <FixOutletHeight className="" />
      </Layout>
    </ThemeProvider>
  );
}
