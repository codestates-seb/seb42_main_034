import { useState } from 'react';
import styled from 'styled-components';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/userSlice';
import LoginInput from './LoginInput';
import { useAuthAPI } from '../../api/auth';
import { notifi } from '../../utils/notifi';
import { DEFAULT_VERSION } from 'redux-persist';

const EmailWrapper = styled.div``;
const PWWrapper = styled.div``;
const LoginFormWrapper = styled.form`
  width: 100%;
  min-width: 22rem;
  height: 200px;
  padding: 4rem;
  text-align: center;
`;
const LoginButton = styled.button`
  height: 120px;
  width: 200px;
  margin: 10px 300px;
`;

const Loginform = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vaildEmail, setVaildEmail] = useState(true);
  const [vaildPW, setVaildPW] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postLogin } = useAuthAPI();

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      dispatch(login({ ...data, accessToken: authorization, isLogin: true }));
      notifi(dispatch, `${data.nickname}님 환영합니다.`);
      navigate(-1);

      setTimeout(() => {
        dispatch(login({ accessToken: 'Bearer ', isLogin: true }));
      }, 1000 * 60 * 29);
    },
    onError: (res) => {
      console.log('login failed: ', res);
      alert('아이디 혹은 비밀번호를 확인해주세요');
    },
  });
  console.log(email);

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
      <LoginInput label="ID" state={email} setState={setEmail} />
      <div>{vaildEmail ? '' : '아이디를 입력 해주세요.'}</div>

      <LoginInput label="PW" type="password" state={password} setState={setPassword} />
      <div>{vaildPW ? '' : '비밀번호를 입력 해주세요.'}</div>

      <LoginButton>로그인</LoginButton>
    </LoginFormWrapper>
  );
};

export default Loginform;
