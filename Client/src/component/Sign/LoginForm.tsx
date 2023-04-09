import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/userSlice';
import LoginInput from './LoginInput';
import { useAuthAPI } from '../../api/auth';
import { notifi } from '../../utils/notifi';
import LoginButton from './LoginButton';
import { useAppSelector } from 'redux/hooks';

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vaildEmail, setVaildEmail] = useState(true);
  const [vaildPW, setVaildPW] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postLogin } = useAuthAPI();
  const data1 = useAppSelector((state) => state.persistReducer.userInfo);
  const { mutate, data: userData } = useMutation({
    mutationKey: ['loginInfo'],
    mutationFn: () =>
      postLogin({
        username: email,
        password: password,
      }),
    onSuccess: (res) => {
      const {
        data,
        headers: { authorization },
      } = res;
      dispatch(login({ ...data, accessToken: authorization, isLogin: true }));
      notifi(dispatch, `${res.data.nickname}님 환영합니다.`);
      navigate(-1);
      console.log(data1);

      // setTimeout(() => {
      //   dispatch(login({ accessToken: 'Bearer ', isLogin: true }));
      // }, 1000 * 60 * 29);
    },
    onError: (res) => {
      console.log('login failed: ', res);
      alert('아이디 혹은 비밀번호를 확인해주세요');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === '') setVaildEmail(false);
    else setVaildEmail(true);
    if (password === '') setVaildPW(false);
    else setVaildPW(true);
    if (email === '' || password === '') return;
    mutate();
  };

  return (
    <LoginFormWrapper onSubmit={handleSubmit}>
      <EmailWrapper>
        <LoginInput label="ID" state={email} setState={setEmail} />
        {vaildEmail ? '' : '아이디를 입력 해주세요.'}
      </EmailWrapper>
      <PWWrapper>
        <LoginInput label="PW" type="password" state={password} setState={setPassword} />
        {vaildPW ? '' : '비밀번호를 입력 해주세요.'}
      </PWWrapper>

      <StyledLoginButton fontSize="small" backgroundColor="grey">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        로그인
      </StyledLoginButton>
    </LoginFormWrapper>
  );
};

export default Loginform;

const EmailWrapper = styled.div`
  position: relative;
`;
const PWWrapper = styled.div`
  position: relative;
`;

const LoginFormWrapper = styled.form`
  width: 100%;
  min-width: 22rem;
  display: grid;
  height: 200px;
`;

const btnAnim1 = keyframes`
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
`;

const btnAnim2 = keyframes`
  0% {
    top: -100%;
  }
  50%, 100% {
    top: 100%;
  }
`;

const btnAnim3 = keyframes`
  0% {
    right: -100%;
  }
  50%, 100% {
    right: 100%;
  }
`;

const btnAnim4 = keyframes`
  0% {
    bottom: -100%;
  }
  50%, 100% {
    bottom: 100%;
  }
`;

const StyledLoginButton = styled(LoginButton)`
  position: relative;
  display: inline-block;
  height: 2.5rem;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  overflow: hidden;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 10px;
  padding: 12px 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    background: #0583c6;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #0583c6, 0 0 25px #0583c6, 0 0 50px #0583c6, 0 0 100px #0583c6;
  }
  span {
    position: absolute;
    display: block;
  }
  span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;

    background: linear-gradient(90deg, transparent, #013ef6);

    animation: ${btnAnim1} 1s linear infinite;
  }
  span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;

    background: linear-gradient(180deg, transparent, #013ef6);

    animation: ${btnAnim2} 1s linear infinite;
    animation-delay: 0.25s;
  }
  span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;

    background: linear-gradient(270deg, transparent, #013ef6);

    animation: ${btnAnim3} 1s linear infinite;
    animation-delay: 0.5s;
  }
  span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;

    background: linear-gradient(360deg, transparent, #013ef6);

    animation: ${btnAnim4} 1s linear infinite;
    animation-delay: 0.75s;
  }
`;
