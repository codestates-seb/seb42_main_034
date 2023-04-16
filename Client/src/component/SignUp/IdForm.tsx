import styled from "styled-components";
import React from "react";
import SignInput from "component/ui/SignInput";
import { USERID_REGEX } from "hooks/consts";
import { notifi } from "utils/notifi";


interface IdFormProps {
    data: {
        label: string;
        state: string;
        setState: (value:string)=>void;
        setValidity: (value:any)=>void;
    };
    notifi:(value:string)=>void;
}

const IdForm = ({data, notifi}: IdFormProps) => {
    const {label, state, setState, setValidity} = data;
    
    const handleValidate = (
      label: string,
      state: string,
      validate: (value:string)=>void,
    ) => {
      if(label === '아이디' && !USERID_REGEX.test(state)) {
        notifi('아이디는 영문과 숫자로 입력해야 합니다.');
      } else {
        notifi(`${label === '아이디' ? '아이디를' : '닉네임을'} 입력 해주세요.`)
      }
    }
    
    return (
        <IDContainer>
            <StyledIdLabel htmlFor={label}>{label}</StyledIdLabel>
            <SignInput label={label} state={state} setState={setState} maxLength={25} />
            <div onClick={() => handleValidate(label, state, setValidity)}>중복확인</div>
        </IDContainer>
    )
}



const IDContainer = styled.div`
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

const StyledIdLabel = styled.label`
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