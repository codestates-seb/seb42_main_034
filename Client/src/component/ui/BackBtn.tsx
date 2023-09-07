import { HoverAction } from 'component/style/cssTemplete';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './Button';
import { FaArrowLeft } from 'react-icons/fa';
import { FontSize } from 'component/style/variables';
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
  width: 100%;
  text-align: start;
  font-size: ${FontSize.h3};
`;
