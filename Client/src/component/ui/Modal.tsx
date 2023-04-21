import { Props } from 'component/header/Logo';
import React from 'react';
import styled from 'styled-components';
import { LayoutProps } from './Layout';

export default function Modal({ children }: LayoutProps) {
  return <ModalBackground>{children}</ModalBackground>;
}
const ModalBackground = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 8;
  opacity: 0.4;
  position: fixed;
  top: 0;
  left: 0;
`;
const Div = styled.div`
  position: absolute;
`;
