import styled from "styled-components";
import React from "react";
import SignInput from "component/ui/SignInput";


interface IdFormProps {
    data: {
        label: string;
        state: string;
        setState: (value:string)=>void;
    };
    notifi:(value:string)=>void;
}

const IdForm = ({data}: IdFormProps) => {
    const {label, state, setState} = data; 
    
    return (
        <MainContainer>
            <StyledLabel htmlFor={label}>{label}</StyledLabel>
            <SignInput label={label} state={state} setState={setState} maxLength={25} />
        </MainContainer>
    )
}



const MainContainer = styled.div`
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
`

const StyledLabel = styled.label`
  position: sticky;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .6s;
  width: 10%;
`;






export default IdForm;