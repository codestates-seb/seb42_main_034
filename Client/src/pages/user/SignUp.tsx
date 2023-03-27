import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SignUpForm } from '../../component/SignUp/SignUpForm';
import { useAppSelector } from '../../redux/hooks';



export default function SignUp() {
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();

  useEffect(() => {
    isLogin && navigate(-1);
  }, []);



  return (
    <MainContainer>
      <Title>여기 와봤니? 회원가입</Title>
      <FormWrapper>
        <SignUpForm />
      </FormWrapper>
    </MainContainer>
  );
}



const MainContainer = styled.div`
  border: solid 1px red;
  width: 100%;
  min-width: 200px;
  padding: 0 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #62a3f4;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: black;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-right: 250px;
`

const FormWrapper = styled.div`
  width: 80%;
  max-width: 800px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
