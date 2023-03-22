import classNames from 'classnames';
import React, { DOMAttributes } from 'react';
import { ButtonHTMLAttributes } from 'react';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  isDisabled?: boolean;
  typeButton?: ButtonType;
  onClick?: any;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  region?: string;
}
export const Button: React.FC<IButtonProps> = ({ className, children, isDisabled, typeButton, onClick, ...rest }) => {
  return (
    <button
      className={classNames('Button', className)}
      disabled={isDisabled}
      type={typeButton}
      onClick={onClick}
      {...rest}
    >
      <span>{children}</span>
    </button>
  );
};
