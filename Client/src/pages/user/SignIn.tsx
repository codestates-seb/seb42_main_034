import React, { useEffect } from 'react'
import { useAppSelector } from '../../redux/hooks'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const PageStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #62A3F4;
`


const SignIn = () => {
  // const { isLogin } = useAppSelector(state => state.loginInfo);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   isLogin && navigate(-1);
  // }, []);

  return (
    <div>
      <div>dfasdf</div>
        
        
    </div>
  )



}
export default SignIn;