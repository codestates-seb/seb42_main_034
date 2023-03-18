import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { notifi } from "../../utils/notifi";
import useAPI from "../../hooks/uesAPI";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { SignUpMessages } from "../../utils/SignUpMessages";

export type inputKeys = 'userId' | 'nickname'|'email'|'password'|'passwordCheck';


const SignUpForm = () => {
    
    const [inputs, setInputs] = useState({
        userId: '',
        nickname: '',
        email: '',
        password: '',
        passwordCheck: '',
    });
    const { userId, nickname, password, email } = inputs;
    const [isValid, setIsValid] = useState({
        userId: false,
        nickname: false,
        email: false,
        password: false,
        passwordCheck: false,
    });
    const [isChecked, setIsChecked] = useState(false);
    const api = useAPI();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const notifiMessages = SignUpMessages(inputs, isValid, isChecked);
    const goNotifi = (message: string) => notifi(dispatch, message);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        notifiMessages.forEach((message, notifiCase) => {
            if(notifiCase) goNotifi(message);
        });

        if(!Object.values(isValid).includes(false) && isChecked) {
            const data = { userId, nickname, password, email };
            try {
                await api.post('/board/signup', data);
                goNotifi('회원가입이 완료 되었습니다.');
                navigate('/board/signin');
            } catch {
                goNotifi('회원가입에 실패 하였습니다.');
            }
        }
    }





}