// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
import styled from 'styled-components';
import React from 'react';
import { Colors } from '../style/variables';
interface InputProps {
  label: string;
  state?: string;
  setState?: (value: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}

const MainDiv = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: normal;
  }
`;

const StyledLabel = styled.label`
  white-space: nowrap;
  font-size: 20px;
  font-weight: bold;
  margin: 0 1.5rem 0 0;
  @media screen and (max-width: 800px) {
    margin-bottom: 7px;
  }
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 10px 15px;
  font-size: 20px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  border: ${Colors.button_blue + ' 1px solid'};
  :focus {
    outline: none;
    border-color: ${Colors.button_blue};
  }
  @media screen and (min-width: 800px) {
    width: 60%;
  }
`;

const LoginInput = (props: InputProps) => {
  const { label, state, setState, type, placeholder, maxLength } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState?.(e.target.value);
  };

  return (
    <MainDiv>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput
        id={label}
        type={type}
        value={state}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </MainDiv>
  );
};

export default LoginInput;
