import React, { useEffect } from 'react';
import { useAppSelector } from '../../redux/hooks';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../../component/Sign/LoginForm';
import SignLink from 'component/SignUp/SignLink';
import { Props } from 'component/ui/Modal';
import { Button } from 'component/ui/Button';
import { Flex } from 'component/style/cssTemplete';
import { FontSize } from 'component/style/variables';
import { MoveBtn } from 'pages/QuestionBoardList';

const SignIn = ({
  setModal,
  modal,
  setsignupModal,
}: Pick<Props, 'setModal' | 'modal'> & { setsignupModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { isLogin } = useAppSelector((state) => state.loginInfo);
  const navigate = useNavigate();

  useEffect(() => {
    isLogin && navigate(-1);
  }, [isLogin]);

  return (
    <>
      {isLogin || (
        // <PageStyled>
        // <Container>
        <>
          <Title>로그인</Title>
          <LoginForm setModal={setModal} modal={modal} />
          <Flex>
            <LoginBottomContainer>
              아직 회원이 아니신가요 ?
              <MoveBtn
                onClick={() => {
                  setModal(!modal);
                  setsignupModal((prev) => !prev);
                }}
              >
                회원가입 하러가기
              </MoveBtn>
            </LoginBottomContainer>
          </Flex>
        </>
        // </Container>
        //  </PageStyled>
      )}
    </>
  );
};
export default SignIn;

const Title = styled.h2`
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
`;
const LoginBottomContainer = styled.div`
  font-size: ${FontSize.md};
`;
