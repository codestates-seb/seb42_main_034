import { HoverAction } from 'component/style/cssTemplete';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './Button';
import { FaArrowLeft } from 'react-icons/fa';
export default function BackBtn() {
  const navigate = useNavigate();
  return (
    <BackButton
      onClick={() => {
        navigate(-1);
      }}
    >
      <FaArrowLeft />
    </BackButton>
  );
}

const BackButton = styled(Button)`
  ${HoverAction}
  border: none;
  background: none;
  width: 100%;
  text-align: start;
`;
