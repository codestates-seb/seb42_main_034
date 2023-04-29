import React from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import Slider, { Settings } from 'react-slick';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlideWrapper = styled.section`
  position: relative;
`;

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
  slidesToShow?: number;
}

function Slick({ slidesToShow, children, className, autoplay = true, speed = 3000, loop = true }: sliderProps) {
  const settings = useMemo<Settings>(
    () => ({
      dots: true,
      infinite: true,
      speed: speed,
      slidesToShow,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
      slidesToScroll: 1,
      //   className: 'center',
      //   centerMode: true,
      //   centerPadding: '60px',
      prevArrow: <PrevArrow direction="left" />,
      nextArrow: <NextArrow direction="right" />,
    }),
    [autoplay, loop, speed],
  );
  return (
    <SlideWrapper className={className}>
      <Slider {...settings}>{children}</Slider>
    </SlideWrapper>
  );
}

const PrevArrow = ({
  direction,
  onClick,
}: {
  direction: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <StyledArrow className={`slick-arrow slick-${direction}`} onClick={onClick}>
    <AiOutlineArrowLeft />
  </StyledArrow>
);
const NextArrow = ({
  direction,
  onClick,
}: {
  direction: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => (
  <StyledArrow className={`slick-arrow slick-${direction}`} onClick={onClick}>
    <AiOutlineArrowRight />
  </StyledArrow>
);
export default Slick;
const StyledArrow = styled.button`
  border: none;
  background: none;
  height: 2rem;
`;
