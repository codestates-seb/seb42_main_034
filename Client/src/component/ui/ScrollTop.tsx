import { BoxShadow, Flex, HoverAction } from 'component/style/cssTemplete';
import { Colors, FontSize } from 'component/style/variables';
import React, { useEffect } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';
import styled from 'styled-components';
import { Button } from './Button';
const ScrollTop1 = styled(Button)`
  ${HoverAction}
  height: 2rem;
  font-size: ${FontSize.md};
  text-align: end;
  width: 100%;
  padding-left: 0.6rem;
  padding-right: 1rem;
  bottom: 8rem;
  border-radius: 4rem;
`;

export const handleScroll = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
// const scrollTopBtn = document.querySelector('.scroll') as HTMLButtonElement;
// useEffect(() => {
//   window.addEventListener('scroll', () => {
//     if (window.scrollY > 300) {
//       // Change this value to adjust when the button appears
//       scrollTopBtn.style.display = 'block';
//     } else {
//       scrollTopBtn.style.display = 'none';
//     }
//   });
// });

export default function ScrollTop() {
  return (
    <ScrollTop1
      className="scroll"
      children={
        <Flex justify="end" items="center" gap="2px">
          위로 올라가기
          <BsArrowUpCircle />
        </Flex>
      }
      onClick={handleScroll}
    />
  );
}
