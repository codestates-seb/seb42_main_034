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
      <SubmitButton>회원가입</SubmitButton>
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

const SubmitButton = styled(Nbutton)`
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
`;
