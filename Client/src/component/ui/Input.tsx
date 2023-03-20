import React, { HTMLInputTypeAttribute } from 'react';
import styled from 'styled-components';

export interface InputProps {
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  value?: string;
  width?: string;
  height?: string;
  marginBottom?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ type, name, placeholder, ...props }: InputProps) {
  return <StyleInput type={type} name={name} placeholder={placeholder} {...props} />;
}

const StyleInput = styled.input<InputProps>`
  padding-left: 1rem;
  width: ${({ width }) => width ?? '30rem'};
  height: ${({ height }) => height ?? '3rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? '0'};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.white};
  // border: 0.05rem solid ${(props) => props.theme.colors.border2};
  outline: 0.4rem solid ${(props) => props.theme.colors.border2};
  ::placeholder {
    color: ${(props) => props.theme.colors.grey};
    letter-spacing: 0.05rem;
  }
  :focus {
    // border: 0.05rem solid ${(props) => props.theme.colors.border3};
    outline: 0.4rem solid ${(props) => props.theme.colors.border3};
  }
`;

export default Input;
