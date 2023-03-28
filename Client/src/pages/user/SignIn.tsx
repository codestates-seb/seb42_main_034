import React, { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../component/Sign/LoginForm';
import SignLink from 'component/SignUp/SignLink';

const SignIn = () => {
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();

  useEffect(() => {
    isLogin && navigate(-1);
  }, []);

  return (
    <>
    {isLogin || (
    <PageStyled>
      <Container>
        <Title>로그인</Title>
      <LoginForm />
      <SignLink message='아직 회원이 아니신가요 ?'  linkText="회원가입 하러가기" link='signup'/>
      </Container>
    </PageStyled>
    )}
  </>
  )
};
export default SignIn;

const PageStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  position: absolute;
  width: 40%;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  padding: 40px;
  background: rgba(31, 113, 243, 0.5);
  box-shadow: 0 15px 25px rgba(31, 113, 243, 0.6);
  border-radius: 8px;
  height: 40%;
`;
const Title = styled.h2`
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
`;
