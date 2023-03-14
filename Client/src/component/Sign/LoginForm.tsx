import { useState } from "react";
import styled from "styled-components";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/userInfo";
import Input from "../ui/Input";
import { useAuthAPI } from "../../api/auth";


const EmailWrapper = styled.div``;
const PWWrapper = styled.div``;
const LoginFormStyled = styled.form`
    width: 100%;
    min-width: 22rem;
    display: grid;
    height: 200px;
`


const Loginform = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [vaildEmail, setVaildEmail] = useState(true);
    const [vaildPW, setVaildPW] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {postLogin} = useAuthAPI();

    const { mutate, data: userData } = useMutation({
        mutationKey: ['loginInfo'],
        mutationFn: () =>
            postLogin({
                userId: email,
                password: password,
            }),
        onSuccess: res => {
            const {
                data,
                headers: { authorization },
            } = res;
            dispatch(login({ ...data, accessToken: authorization, isLogin: true }));
            notify(dispatch, `${data.nickname}님 환영합니다.`);
            navigate(-1);


            setTimeout(() => {
                dispatch(login({ accessToken: 'Bearer ', isLogin: true }));
            }, 1000 * 60 * 29);
        },
        onError: res => {
            console.log('login failed: ', res);
            alert('아이디 혹은 비밀번호를 확인해주세요');
        },
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(email === '') setVaildEmail(false);
        else setVaildEmail(true);
        if(password === '') setVaildPW(false);
        else setVaildPW(true)
        if (email === '' || password === '') return;
        mutate();
    }


    return (
        <LoginFormStyled>
            <EmailWrapper>
                <Input label="email" state={email} setState={setEmail}  />
            </EmailWrapper>
            <PWWrapper>
                <Input label="PW" state={password} setState={setPassword} />
            </PWWrapper>
        </LoginFormStyled>
    )

}

export default Loginform;