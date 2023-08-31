import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

function MyCarousel({ children }: { children: React.ReactNode }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowButton direction="prev" />,
    nextArrow: <ArrowButton direction="next" />,
  };

  return <Slider {...settings}>{children}</Slider>;
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className={`arrow-button ${direction}`} onClick={onClick}>
      {direction === 'prev' ? '<' : '>'}
    </button>
  );
}

export default MyCarousel;
const BackImg = styled.div<{ url: string }>`
  background-image: ${(props) => props.url && `url(${props.url})`};
  background-size: 80%;
  background-position: center;
  background-repeat: no-repeat;
  height: 20rem;
  position: relative;
  width: 100%;
`;
