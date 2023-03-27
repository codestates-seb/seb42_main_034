import React from 'react';

import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './component/style/theme';

import { Layout } from './component/ui/Layout';
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}
