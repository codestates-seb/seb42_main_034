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
            <LoginForm />
            <SignLink message="아직 회원이 아니신가요 ?" linkText="회원가입 하러가기" link="signup" />
          </Container>
        </PageStyled>
      )}
    </>
  );
};
export default SignIn;

const PageStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #62a3f4;
`;
const Container = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
