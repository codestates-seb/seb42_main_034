import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, ScreenSize } from '../component/style/const';
import { BoxShadow } from '../component/style/cssTemplete';
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: inherit;
  overflow-y: auto;
  &::-webkit-scrollbar {
    padding: 4rem;
    width: 8px;
    height: 6px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  padding: 2rem;
  border-radius: 3rem;
  max-width: ${ScreenSize.max_width};
  margin: auto;
  background: ${Colors.border_001};
  ${BoxShadow}
`;
export default function Board() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
