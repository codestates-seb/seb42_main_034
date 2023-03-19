import axios from "axios";
import styled from "styled-components";
import Input from "component/ui/Input";
import { BASE_URL, USERID_REGEX } from "hooks/consts";
import React from "react";
import SignInput from "component/ui/SignInput";
import { AxiosResponse } from "axios";
interface IdFormProps {

    data: {
        label: string;
        state: string;
        validity: boolean;
        setState: (value:string)=>void;
        setValidity: (value:any)=>void;
     
        
    };
    notifi:(value:string)=>void;
}



const IdForm = ({data, notifi}: IdFormProps) => {
    const {label, state, setState, setValidity} = data; 

    const handleValidateClick = (
        label: string,
        state: string,
        validate:(value:boolean)=>void,
    ) => {
        if(label === '아이디' && !USERID_REGEX.test(state)) {
            notifi('아이디는 영문과 숫자로 입력해야 합니다.');
        } else {
            const endPoint = label === '아이디' ? 'id' : 'nickname';
            state ? axios 
                .get(
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${BASE_URL}/board/signup/check${endPoint}?${endPoint}=${state}`,
                )
                .then((res:AxiosResponse<IdFormProps>) => {
                    if(res) {
                        validate(true);
                        notifi(`사용 가능한 ${label} 입니다.`);
                    } else notifi('에러');
                })
                .catch((e: Error) => {
                    notifi(e.message);
                }) : notifi(
                    `${label === '아이디' ? '아이디를' : '닉네임을'} 입력 해주세요.`,
                );
        }
    };
    
    return (
        <MainContainer>
            <InputWrapper key={label}>
                <SignInput label={label} state={state} setState={setState} maxLength={20}/>
                
                <div>
                    나 적용 잘 되고있니?
                </div>
            </InputWrapper>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    width: 100%;
    display: grid;
`
const InputWrapper = styled.div`
    width: 100%;
    flex-wrap: wrap;
    position: relative;
    display: flex;
`









export default IdForm;