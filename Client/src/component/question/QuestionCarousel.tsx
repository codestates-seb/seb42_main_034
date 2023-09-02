import Slick from 'component/slider/Slider';
import { Colors } from 'component/style/variables';
import React from 'react';
import styled from 'styled-components';
const item = [
  {
    items: '/image/foodie.jpg',
  },
  {
    items:
      'https://images.unsplash.com/photo-1472393365320-db77a5abbecc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
  },
];
export default function QuestionCarousel() {
  return (
    <StyledSlick slidesToShow={1}>
      <BackImg>1</BackImg>
      <BackImg>2</BackImg>
    </StyledSlick>
  );
}

const StyledSlick = styled(Slick)`
  margin-bottom: 2rem;
  width: 100%;
`;
const BackImg = styled.div`
  background: ${Colors.main_03};
  height: 10rem;
  width: 100%;
`;
