import React, { DOMAttributes } from 'react';
import styled from 'styled-components';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  isDisabled?: boolean;
  typeButton?: ButtonType;
  onClick?: any;
  children: React.ReactNode | string | number;
  style?: React.CSSProperties;
  region?: string;

  setState?: React.Dispatch<React.SetStateAction<string>>;
}
export const Button: React.FC<IButtonProps> = ({ className, children, isDisabled, typeButton, onClick, ...rest }) => {
  return (
    <CommonBtn className={className} disabled={isDisabled} type={typeButton} onClick={onClick} {...rest}>
      {children}
    </CommonBtn>
  );
};
const CommonBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
