import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { LayoutProps } from './Layout';
import { AiFillCloseCircle } from 'react-icons/ai';
export interface Props {
  width: string;
  height: string;
  children: React.ReactElement;
  setModal: Dispatch<SetStateAction<boolean>>;
  modal: boolean;
}
export default function Modal({ modal, width, height, children, setModal }: Props) {
  const handleOpen = () => {
    setModal(!modal);
  };
  return (
    <>
      <ModalBackground width={width} height={height}>
        <div className="exit-wrapper" onClick={handleOpen}>
          &times;
        </div>
        {children}
      </ModalBackground>
      <Canvas onClick={handleOpen} />
    </>
  );
}
const ModalBackground = styled.div<{ width: string; height: string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: calc(50vw - ${(props) => props.width}px / 2);
  top: calc(50vh - ${(props) => props.height}px / 2);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 8px;
  background: rgba(31, 113, 243, 0.75);
  box-shadow: 0 15px 25px rgba(31, 113, 243, 0.6);
  border-radius: 8px;
  z-index: 2000;
  padding: 3.8em;
  .exit-wrapper {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 32px;
    width: 32px;
    height: 32px;
    line-height: 26px;
    background-color: transparent;
    cursor: pointer;
  }
`;
const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 53;
`;
