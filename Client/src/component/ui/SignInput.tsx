import React from 'react';
import styled from 'styled-components';

export interface SignInputProps {
  label: string,
  setState?: (value: string) => void;
  state?: string;
  maxLength: number;
  type?: string;
  placeholder?: string;
  marginBottom?: string;
}

const SignInput = (props: SignInputProps) => {
  const {label, state, type, placeholder, maxLength, setState} = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setState?.(e.target.value);
  };
  return (
    <>
        <StyledInput label={label} type={type} value={state} onChange={handleChange} placeholder={placeholder} maxLength={maxLength}/> 
    </>
  )
}

const StyledInput = styled.input<SignInputProps>`
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




export default SignInput;
