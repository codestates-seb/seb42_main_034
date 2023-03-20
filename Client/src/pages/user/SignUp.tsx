import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SignUpForm } from '../../component/SignUp/SignUpForm';
import { useAppSelector } from '../../redux/hooks';

export default function SignUp() {
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();

  // useEffect(() => {
  //   isLogin && navigate();
  // }, []);

  return (
    <MainContainer>
      <SignUpForm />
    </MainContainer>
  );
}
const MainContainer = styled.div`
  border: solid 1px red;
  width: 100%;
  min-width: 200px;
  padding: 0 100px;
  display: flex;
`;
