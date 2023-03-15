import React from 'react';
import styled from 'styled-components';
export type ButtonProps = {
  children: React.ReactNode;
  styles: string;
  disabled?: boolean;
  onClick?: any;
  type: 'submit' | 'button'; //제출버튼과 일반 버튼
};

export const NavButton = ({ children, styles, onClick, disabled, type }: ButtonProps) => {
  return <div></div>;
};
