import { SignUpForm } from 'component/SignUp/SignUpForm';
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppSelector } from '../../redux/hooks'




export default function SignUp() {
  const {isLogin} = useAppSelector(state => state.loginInfo);
  const navigate = useNavigate();

  // useEffect(() => {
  //   isLogin && navigate();
  // }, []);


  return (
    <>
    
    <SignUpForm />
    
    </>
  )

}
