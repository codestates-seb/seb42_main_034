import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Colors, ScreenSize } from '../component/style/variables';
import { BoxShadow } from '../component/style/cssTemplete';


const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${ScreenSize.middle_height};
  max-height: ${ScreenSize.middle_height};
  overflow-y: scroll;
  overflow-x: hidden;
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
  background: ${Colors.board_color};
  border: 5px solid black;
  ${BoxShadow};
`;
export default function Board() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
