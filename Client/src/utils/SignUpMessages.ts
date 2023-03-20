import { inputKeys } from "../component/SignUp/SignUpForm";

type Input = { [key in inputKeys]: string|boolean};


export const SignUpMessages = (
    input: Input,
    isVaild: Input,
    isChecked: boolean,
) => 
new Map([
    [!isChecked, '약관에 동의 해주세요'],
    [
        !input.passwordCheck||!isVaild.passwordCheck,
        '비밀번호가 일치하지 않습니다.',
    ],
    [!input.password||!isVaild.password, '올바른 비밀번호를 입력 하여 주세요.'],
    [!isVaild.nickname, '닉네임 중복여부를 확인 해주세요.'],
    [!isVaild.userId, '닉네임을 입력 해주세요.'],
    [!input.userId, '아이디를 입력 해주세요.'],
    [!input.email, '이메일을 입력 해주세요.'],
]);
