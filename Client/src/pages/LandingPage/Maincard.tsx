import { Relative } from 'component/style/cssTemplete';
import { Colors, FontSize } from 'component/style/variables';
import { IconPng } from 'component/ui/Icons';
import React from 'react';
import styled from 'styled-components';
import main from '../../image/mountain.jpg';
export default function Maincard() {
  return (
    <StyledBackground className="slide1">
      {/* <StyledBackground src={`/image/river.jpg`} /> */}
      <Font className="top1">
        Find the next place to explore the beauty of the place
        <div className="subIntro"> 각 테마별 여행지를 알아보세요</div>
      </Font>
    </StyledBackground>
  );
}

const StyledBackground = styled.div`
  height: 25em;
  width: 100%;
  margin: auto;
  text-align: center;
  background-image: url(${main});
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Font = styled.div`
  /* position: absolute;
  top: 45%; */

  font-size: ${FontSize.main};
  font-weight: bold;

  color: ${Colors.text_white};
  @media (max-width: 768px) {
    font-size: ${FontSize.h2};
  }
  .subIntro {
    font-size: ${FontSize.h2};
    margin: 0.5em;
  }
`;
