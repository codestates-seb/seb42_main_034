import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  text?: string;
  disabled?: boolean;
  onClick?: (route: string) => void | React.MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'button'; //제출버튼과 일반 버튼
  style?: React.CSSProperties; //좌표용
}

export const NavButton = ({ children, className, onClick, disabled, type, text, style }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => {
        onClick;
      }}
      style={style}
    >
      {text}
    </button>
  );
};
