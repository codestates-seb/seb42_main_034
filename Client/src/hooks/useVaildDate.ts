// import { inputKeys } from 'component/SignUp/SignUpForm';
// import { useEffect } from 'react';
// import { PASSWORDREGEX } from './consts';

// export const useValidate = (input: string, input2: string, setValidity: (key: inputKeys, value: boolean) => void) => {
//   useEffect(() => {
//     const isPasswordValid = !input || PASSWORDREGEX.test(input);
//     const isPasswordCheckValid = input === input2;

//     setValidity('password', isPasswordValid);
//     setValidity('passwordCheck', isPasswordCheckValid);

//   }, []);
// };



// // export const useValidate = (input: string, input2: string, setValidity: (...args: any[]) => void) => {
// //   useEffect(() => {
// //     if (!input || PASSWORDREGEX.test(input)) setValidity('password', true);
// //     else setValidity('password', false);

// //     if (input === input2) setValidity('passwordCheck', true);
// //     else setValidity('passwordCheck', false);
// //   }, [input, input2]);
// // };

// // export const useValidate = (input: string, input2: string, setValidity: (value: boolean) => void) => {
// //   useEffect(() => {
// //     if (input && PASSWORDREGEX.test(input)) {
// //       setValidity(true);
// //     } else {
// //       setValidity(false);
// //     }

// //     if (input === input2) {
// //       setValidity(true);
// //     } else {
// //       setValidity(false);
// //     }
// //   }, [input, input2]);
// // };