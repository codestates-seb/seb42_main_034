// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
import styled from 'styled-components';
import React from 'react';

interface InputProps {
  label: string;
  state?: string;
  setState?: (value: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}

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

const StyledInput = styled.input`
width: 100%;
padding: 10px 0;
font-size: 16px;
color: #fff;
border: none;
margin-bottom: 30px;
border-bottom: 1px solid #fff;
outline: none;
background: transparent;
&:focus ~ label,
&:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size:12px;
}
`;


const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .6s;
`;






export default LoginInput;


