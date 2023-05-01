import { Props } from 'component/header/Logo';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { LayoutProps } from './Layout';
import { AiFillCloseCircle } from 'react-icons/ai';
export default function Modal({ children }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen && (
        <ModalBackground>
          <Button children={<AiFillCloseCircle />} />
          {children}
        </ModalBackground>
      )}
    </>
  );
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
