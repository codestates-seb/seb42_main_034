import React from 'react';

import { Outlet } from 'react-router-dom';
import { Layout } from './component/ui/Layout';
export default function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
