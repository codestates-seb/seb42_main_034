// import axios from "axios";
// import styled from "styled-components";
// import { BASE_URL, CITY } from "hooks/consts";
// import React from "react";
// import SignInput from "component/ui/SignInput";
// import { AxiosResponse } from "axios";


// interface IdFormProps {

//     data: {
//         label: string;
//         state: string;
//         validity: boolean;
//         setState: (value:string)=>void;
//         setValidity: (value:any)=>void;
//     };
//     notifi:(value:string)=>void;
// }



// const IdForm = ({data, notifi}: IdFormProps) => {
//     const {label, state, setState, setValidity} = data; 

//     const handleValidateClick = (
//         label: string,
//         state: string,
//         validate:(value:boolean)=>void,
//     ) => {
//         if(label === '도시는' && !CITY) {
//             notifi('도시는 한글로 입력해야 합니다.');
//         } else {
//             const endPoint = label === '도시' ? 'city' : 'location';
//             state ? axios 
//                 .get(
//                     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//                     `${BASE_URL}members/check${endPoint}?${endPoint}=${state}`,
//                 )
//                 .then((res:AxiosResponse<IdFormProps>) => {
//                     if(res) {
//                         validate(true);
//                         notifi(`사용 가능한 ${label} 입니다.`);
//                     } else notifi('에러');
//                 })
//                 .catch((e: Error) => {
//                     notifi(e.message);
//                 }) : notifi(
//                     `${label === '도시명을' ? '거주지를' : '살고 계신곳을'} 입력 해주세요.`,
//                 );
//         }
//     };
    
//     return (
//         <MainContainer>
//             <InputWrapper key={label}>
//                 <SignInput label={label} state={state} setState={setState} maxLength={20} placeholder="살고계신 도시명을 입력 해주세요." />

//             </InputWrapper>
//         </MainContainer>
//     )
// }

// const MainContainer = styled.div`
//     width: 100%;
//     display: grid;
// `
// const InputWrapper = styled.div`
//     width: 100%;
//     flex-wrap: wrap;
//     position: relative;
//     display: flex;
// `









// export default IdForm;