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
    <Wrapper>
        <StyledInput label={label} type={type} value={state} onChange={handleChange} placeholder={placeholder} maxLength={maxLength}/> 
    </Wrapper>
  )
}
const Wrapper = styled.div`
    
`
const StyledInput = styled.input<SignInputProps>`
  padding-left: 1rem;
  width: ${({ width }) => width ?? '30rem'};
  height: ${({ height }) => height ?? '3rem'};
  margin-bottom: ${({ marginBottom }) => marginBottom ?? '0'};
  border-radius: 4px;
`;

export default SignInput;
