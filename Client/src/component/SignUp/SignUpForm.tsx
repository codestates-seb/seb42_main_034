import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nbutton from 'component/ui/NButton';
import { notifi } from '../../utils/notifi';
import useAPI from '../../hooks/uesAPI';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/hooks';
import { SignUpMessages } from '../../utils/SignUpMessages';
import { useValidate } from 'hooks/useVaildDate';
import React from 'react';
import IdForm from './IdForm';
import PasswordForm from './PasswordForm';
import { keyframes } from 'styled-components';
import CurrentPosition from './CurrentPosition';

export type inputKeys = 'email' | 'nickname' | 'password' | 'passwordCheck';

export const SignUpForm = () => {
  const [inputs, setInputs] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });
  const { email, nickname, password } = inputs;
  const [isValid, setIsValid] = useState({
    email: false,
    nickname: false,
    password: false,
    passwordCheck: false,
  });
  const api = useAPI();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notifiMessages = SignUpMessages(inputs);
  const goNotifi = (message: string) => notifi(dispatch, message);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const notifiMessages = SignUpMessages(inputs);
    let allConditionsSatisfied = true;
    notifiMessages.forEach((message, notifiCase) => {
      if (notifiCase) {
        allConditionsSatisfied = false;
        goNotifi(message);
      }
    });

    if (allConditionsSatisfied) {
      const data = { email, nickname, password };
      try {
        await api.post('/members', data);
        goNotifi('회원가입이 완료 되었습니다.');
        navigate('/board/signin');
        alert('회원가입 완료');
      } catch {
        goNotifi('회원가입에 실패 하였습니다...');
      }
    }
  };

  const getSectionProps = (label: string, select: inputKeys) => {
    const state = inputs[select];
    const setState = (value: string) =>
      setInputs((pre) => {
        return {
          ...pre,
          [select]: value,
        };
      });
    const validity = isValid[select];
    const setValidity = (value: boolean) =>
      setIsValid((pre) => {
        return {
          ...pre,
          [select]: value,
        };
      });

    const type = select;
    return { label, state, setState, validity, setValidity, type };
  };

  useValidate(inputs.password, inputs.passwordCheck, (input: inputKeys, value: boolean) =>
    setIsValid((pre) => {
      return {
        ...pre,
        [input]: value,
      };
    }),
  );

  return (
    <MainFormContainer onSubmit={handleSubmit}>
      <FormWrapper>
        <IdForm data={getSectionProps('아이디', 'email')} notifi={goNotifi} />
        <IdForm data={getSectionProps('닉네임', 'nickname')} notifi={goNotifi} />
        <PasswordForm data={getSectionProps('비밀번호', 'password')} />
        <PasswordForm data={getSectionProps('비밀번호 확인', 'passwordCheck')} />
        <CurrentPosition />
      </FormWrapper>
      <SubmitButton>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        회원가입</SubmitButton>
    </MainFormContainer>
  );
};

const MainFormContainer = styled.form`
  width: 100%;
  min-width: 22rem;
  display: grid;
  height: 200px;
`;

const FormWrapper = styled.div`
  position: relative;
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

const SubmitButton = styled(Nbutton)`
  position: relative;
  display: inline-block;
  height: 2.5rem;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  text-align: center;
  width: 100%;
  border: solid 1px red;
  align-items: center;
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
