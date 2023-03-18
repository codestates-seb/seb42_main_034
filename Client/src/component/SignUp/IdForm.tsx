import axios from "axios";
import styled from "styled-components";
import Input from "component/ui/Input";
import { BASE_URL, USERID_REGEX } from "hooks/consts";

interface IdFormProps {
    data: {
        label: string;
        state: string;
        validity: boolean;
        setState: ()=>void;
        setValidity: ()=>void;
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
                .then(res => {
                    if(res.data.success) {
                        validate(true);
                        notifi(`사용 가능한 ${label} 입니다.`);
                    } else notifi(res.data.message);
                })
                .catch(e => {
                    notifi(e.message);
                }) : notifi(
                    `${label === '아이디' ? '아이디를' : '닉네임을'} 입력 해주세요.`,
                );
        }
    } 
}