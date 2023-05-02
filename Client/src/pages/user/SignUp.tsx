import { Button } from 'component/ui/Button';
import { Props } from 'component/ui/Modal';
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SignUpForm } from '../../component/SignUp/SignUpForm';
import { useAppSelector } from '../../redux/hooks';

export default function SignUp({
  modal,
  setModal,
  setsiginInModal,
}: Pick<Props, 'modal' | 'setModal'> & { setsiginInModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();

  useEffect(() => {
    isLogin && navigate('/');
  }, []);

  return (
    <MainContainer>
      <Title>회원가입</Title>
      <SignUpForm setModal={setModal} modal={modal} setsiginInModal={setsiginInModal} />
      <div>이미 회원이신가요?</div>
      <Button
        onClick={() => {
          setModal(!modal);
          setsiginInModal((prev) => !prev);
        }}
      >
        로그인 하러가기
      </Button>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
`;

const FormWrapper = styled.div`
  position: absolute;
  width: 480px;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  padding: 40px;
  background: rgba(31, 113, 243, 0.5);
  box-shadow: 0 15px 25px rgba(31, 113, 243, 0.6);
  border-radius: 8px;
  height: 60%;
`;
