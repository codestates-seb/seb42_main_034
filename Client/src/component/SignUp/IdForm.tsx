import axios from "axios";
import styled from "styled-components";
import { BASE_URL, USERID_REGEX } from "hooks/consts";
import React from "react";
import SignInput from "component/ui/SignInput";
import { AxiosResponse } from "axios";


interface IdFormProps {

    data: {
        label: string;
        state: string;
        // validity: boolean;
        setState: (value:string)=>void;
        // setValidity: (value:any)=>void;
    };
    notifi:(value:string)=>void;
}



const IdForm = ({data, notifi}: IdFormProps) => {
    // const {label, state, setState, setValidity} = data; 
    const {label, state, setState} = data; 

    const handleValidateClick = (
        label: string,
        state: string,
        // validate:(value:boolean)=>void,
    ) => {
        if(label === '아이디' && !USERID_REGEX.test(state)) {
            notifi('아이디는 영문과 숫자로 입력해야 합니다.');
        } else {
            return notifi(
                `${label === '아이디' ? '아이디를' : '닉네임을'} 입력 해주세요.`,)
            // const endPoint = label === '아이디' ? 'id' : 'nickname';
            // state ? axios 
            //     .get(
            //         // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            //         `${BASE_URL}members/check${endPoint}?${endPoint}=${state}`,
            //         {withCredentials: true,
            //         }
            //     )
            //     .then((res:AxiosResponse<IdFormProps>) => {
            //         if(res) {
            //             validate(true);
            //             notifi(`사용 가능한 ${label} 입니다.`);
            //         } else notifi('에러');
            //     })
            //     .catch((e: Error) => {
            //         notifi(e.message);
            //     }) : notifi(
            //         `${label === '아이디' ? '아이디를' : '닉네임을'} 입력 해주세요.`,
            //     );
        }
    };
    
    return (
        <MainContainer>
            <InputWrapper key={label}>
                {/* <SignInput label={label} state={state} setState={setState} maxLength={20} /> */}
                <SignInput label={label} state={state} setState={setState} maxLength={20} />
                
                {/* <div onClick={()=>handleValidateClick(label, state, setValidity)}> */}
                <div onClick={()=>handleValidateClick(label, state)}>
                    중복확인
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