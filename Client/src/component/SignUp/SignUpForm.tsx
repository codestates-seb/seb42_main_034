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

export type inputKeys = 'userId' | 'nickname' | 'email' | 'password' | 'passwordCheck';

export const SignUpForm = () => {
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
      if (notifiCase) goNotifi(message);
    });

    if (!Object.values(isValid).includes(false) && isChecked) {
      const data = { userId, nickname, password, email };
      try {
        await api.post('/board/signup', data);
        goNotifi('회원가입이 완료 되었습니다.');
        navigate('/board/signin');
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
      <IdForm data={getSectionProps('아이디', 'userId')} notifi={goNotifi} />
      <IdForm data={getSectionProps('닉네임', 'nickname')} notifi={goNotifi} />
      <PasswordForm data={getSectionProps('비밀번호', 'password')} />
      <PasswordForm data={getSectionProps('비밀번호 확인', 'passwordCheck')} />
      <SubmitButton>회원가입</SubmitButton>
    </MainFormContainer>
  );
};

const MainFormContainer = styled.form`
  width: 100%;
  max-width: 700px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const SubmitButton = styled(Nbutton)`
  height: 3rem;
`;
