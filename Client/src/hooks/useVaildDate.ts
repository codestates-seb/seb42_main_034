import { useEffect } from 'react';
import { PASSWORDREGEX } from './consts';

export const useValidate = (
    input: string,
    input2: string,
    setValidity: Function,
) => {
    useEffect(() => {
        if (!input || PASSWORDREGEX.test(input)) setValidity('password', true);
        else setValidity('password', false);


        if (input === input2) setValidity('passwordCheck', true);
        else setValidity('passwordCheck', false);

    }, [input, input2]);
};