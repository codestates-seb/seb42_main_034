import { BoxShadow, HoverAction } from 'component/style/cssTemplete';
import { Colors } from 'component/style/variables';
import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
const ScrollTop1 = styled(Button)`
  background: ${Colors.main_03};
  border: none;
  ${BoxShadow};
  ${HoverAction}
  width: 4rem;
  height: 4rem;
  font-size: 1.3rem;
  padding: 1rem;
  padding-right: 1.4rem;
  position: fixed;
  bottom: 2rem;
  right: 2%;
  border-radius: 4rem;

  & {
  }
`;
export const handleScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
export default function ScrollTop() {
  return <ScrollTop1 children="Top" onClick={handleScroll} />;
}
