export const BASE_URL = process.env.REACT_APP_HOST;  // env없으면  백엔드 url 넣을것. 

export const PASSWORDREGEX =
    /^(?=.?[a-z])(?=.?[0-9])(?=.?[~?!@#$%^&-]).{8,}$/;


export const USERID_REGEX = /^[a-zA-z0-9]/;

export const CONFIRM_MESSAGES = {
    delete: '삭제 하시겠습니까?',
};

export const CITY = '';
