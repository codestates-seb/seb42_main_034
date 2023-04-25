import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nbutton from 'component/ui/NButton';
// import { notifi } from '../../utils/notifi';
import styled from 'styled-components';
import React from 'react';
import { keyframes } from 'styled-components';
// import CurrentPosition from './CurrentPosition';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import useAPI from 'hooks/uesAPI';


export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [pwcheck, setPwcheck] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [pwCheckMessage, setPwCheckMessage] = useState('');
  const [isNickname, setIsNickname] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPwCheck, setIsPwCheck] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const api = useAPI();


  // 아이디 유효성 검사 ( email )
  const handleChangeEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = event.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 올바르지 않습니다.');
        // notifi(dispatch, '이메일 형식이 올바르지 않습니다.');
        setIsEmail(false);
      } else {
        setEmailMessage('올바른 이메일 형식입니다.');
        // notifi(dispatch, '올바른 이메일 형식입니다.');
        setIsEmail(true);
      }
    },
    []
  );


  // 닉네임 유효성 검사 (nickname)
  const handleChangeNickname = useCallback<
    (event: React.ChangeEvent<HTMLInputElement>) => void
  >(event => {
    setNickname(event.target.value);
    if (event.target.value.length < 2 || event.target.value.length > 10) {
      setNicknameMessage('2글자 이상 10글자 미만으로 입력해주세요.');
      // notifi(dispatch, '올바르지 않은 닉네임 형식입니다.');
      setIsNickname(false);
    } else {
      setNicknameMessage('');
      setIsNickname(true);
    }
  }, []);

  
 // 닉네임 중복확인 
 const handleCheckNickname = () => {
  Swal.fire('', '사용 가능한 닉네임입니다.')
  // notifi(dispatch, '사용 가능한 닉네임입니다.')
 }



  // 비밀번호 유효성 검사
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = event.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          '1자 이상의 숫자와 1자 이상의 영문자 조합으로 8자리 이상 입력해주세요.'
        );
        // notifi(dispatch, '올바르지 않은 비밀번호 조합입니다')
        setIsPassword(false);
      } else {
        setPasswordMessage('올바른 비밀번호 형식입니다.');
        setIsPassword(true);
      }
    },
    []
  );


  //  비밀번호 확인 유효성 검사
  const handleChangePwCheck = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = event.target.value;
      setPwcheck(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPwCheckMessage('비밀번호가 일치합니다.');
        setIsPwCheck(true);
      } else {
        setPwCheckMessage('비밀번호가 다릅니다.');
        // notifi(dispatch, '비밀번호가 일치 하지않습니다')
        setIsPwCheck(false);
      }
    },
    [password]
  );


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      isNickname === false ||
      isEmail === false ||
      isPassword === false ||
      isPwCheck === false
    ) {
      Swal.fire('', '양식을 다시 확인해주세요');
      // notifi(dispatch, '회원가입 양식을 획인 해주세요.')
    } else {
      await api
        .post(`/members`, {
          email,
          nickname,
          password,
        })
        .then(() => {
          Swal.fire('Congratulation!', '가입이 완료되었습니다.'),
            navigate('/board/signin');
        })
        .catch(error => {
          console.log(error);
          Swal.fire('', '가입이 완료되어 있는 이메일 입니다.');
          setIsEmail(false);
          setEmailMessage('가입이 완료되어 있는 이메일 입니다.');
        });
    }
  };







  return (
    <MainFormContainer onSubmit={handleSubmit}>
      <FormWrapper>
          <IDContainer>
            <Wrapper>
              <StyledIdLabel htmlFor="nickname">이메일</StyledIdLabel>
            </Wrapper>
            <StyledInput type="text" id="email" onChange={handleChangeEmail}></StyledInput>
            {email.length > 0 && (
              <span className={`message ${isEmail ? 'success' : 'error'}`}>
                {emailMessage}
              </span>
            )}
          </IDContainer>
          <IDContainer>
            <Wrapper>
              <StyledIdLabel htmlFor="nickname">닉네임</StyledIdLabel>
              <CheckBtn onClick={handleCheckNickname}>
                중복확인
              </CheckBtn>
            </Wrapper>
            <StyledInput
              type="text"
              id="nickname"
              onChange={handleChangeNickname}
            ></StyledInput>
            {nickname.length > 0 && (
              <span className={`message ${isNickname ? 'success' : 'error'}`}>
                {nicknameMessage}
              </span>
            )}
          </IDContainer>
          <PWContainer>
            <StyledIdLabel htmlFor="pw">비밀번호</StyledIdLabel>
            <StyledInput
              type="password"
              id="pw"
              onChange={handleChangePassword}
            ></StyledInput>
            {password.length > 0 && (
              <span className={`message ${isPassword ? 'success' : 'error'}`}>
                {passwordMessage}
              </span>
            )}
          </PWContainer>
          <PWContainer>
            <StyledIdLabel htmlFor="pw-check">비밀번호 확인</StyledIdLabel>
            <StyledInput
              type="password"
              id="pw-check"
              onChange={handleChangePwCheck}
            ></StyledInput>
            {pwcheck.length > 0 && (
              <span className={`message ${isPwCheck ? 'success' : 'error'}`}>
                {pwCheckMessage}
              </span>
            )}
          </PWContainer>


        {/* <CurrentPosition /> */}
      </FormWrapper>
      <SubmitButton id="join" type="submit">
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


const IDContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
  .message {
    font-weight: 400;
    font-size: 1rem;
    line-height: 24px;
    letter-spacing: -1px;
    position: absolute;
    bottom: -20px;
    left: 0;
    &.success {
    color: black;
  }
  &.error {
    color: #ff2727;
  }
  }
`

const PWContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 20px;
    .message {
    font-weight: 400;
    font-size: 1rem;
    line-height: 24px;
    letter-spacing: -1px;
    position: absolute;
    bottom: -20px;
    left: 0;
    &.success {
    color: black;
  }
  &.error {
    color: #ff2727;
  }
  }
`


const StyledIdLabel = styled.label`
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .6s;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledInput = styled.input`
width: 100%;
padding: 10px 0;
font-size: 16px;
color: #fff;
border: none;
margin-bottom: 30px;
border-bottom: 1px solid #fff;
outline: none;
background: transparent;
&:focus ~ label,
&:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size:12px;
}
`;

const CheckBtn = styled.div`
background-color: white;
border: none;
width: 80px;
height: 100%;
text-align: center;
cursor: pointer;
font-size: 1rem;
&:hover {
    background: #0583c6;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #0583c6, 0 0 25px #0583c6, 0 0 50px #0583c6, 0 0 100px #0583c6;
  }
`


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