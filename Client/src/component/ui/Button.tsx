import React, { DOMAttributes } from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import { Colors } from '../style/const';

const StyledButton = styled.button<{ backgroundColor?: string; textColor?: string }>`
  padding: 10px 30px;
  height: max-content;
  width: max-content;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : Colors.button_01)};
  color: ${(props) => (props.textColor ? props.textColor : Colors.button_text)};
`;

export type ButtonType = 'button' | 'submit' | 'reset';

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  isDisabled?: boolean;
  typeButton?: ButtonType;
  onClick?: (event: React.MouseEvent) => void;
}

export const Button: React.FC<IButtonProps> = ({ className, children, isDisabled, typeButton, onClick, ...rest }) => {
  return (
    <StyledButton
      className={classNames('Button', className, { Button__disabled: isDisabled })}
      disabled={isDisabled}
      type={typeButton}
      onClick={onClick}
      {...rest}
    >
      <span>{children}</span>
    </StyledButton>
  );
};
