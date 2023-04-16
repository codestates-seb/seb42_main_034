import { useEffect } from 'react';
import { EMAIL_REGEX, PASSWORDREGEX, USERID_REGEX } from './consts';

export const useValidate = (
  email: string,
  nickname: string,
  input: string,
  input2: string,
  setValidity: (...args: any[]) => void,
) => {
  useEffect(() => {
    if (EMAIL_REGEX.test(email)) setValidity('email', true);
    else setValidity('email', false);
    if (USERID_REGEX.test(nickname)) setValidity('nickname', true);
    else setValidity('nackname', false);
    if (!input || PASSWORDREGEX.test(input)) setValidity('password', true);
    else setValidity('password', false);

    if (input === input2) setValidity('passwordCheck', true);
    else setValidity('passwordCheck', false);
  }, [input, input2, email, nickname]);
};

// export const useValidate = (input: string, input2: string, setValidity: (value: boolean) => void) => {
//   useEffect(() => {
//     if (input && PASSWORDREGEX.test(input)) {
//       setValidity(true);
//     } else {
//       setValidity(false);
//     }

//     if (input === input2) {
//       setValidity(true);
//     } else {
//       setValidity(false);
//     }
//   }, [input, input2]);
// };
