import React from 'react';
import styled from 'styled-components';
export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  text: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: 'submit' | 'button'; //제출버튼과 일반 버튼
}

export const NavButton = ({ children, className, onClick, disabled, type, text }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};
