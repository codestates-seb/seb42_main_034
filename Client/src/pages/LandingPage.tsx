import MapContainer from 'component/Kakao.maps';
import TopCard from 'component/landingpage/TopCard';

import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import MiddleCard from 'component/landingpage/MiddleCard';
import ThirdCard from 'component/landingpage/ThirdCard';
gsap.registerPlugin(ScrollTrigger);

const D = styled.div`
  && {
    background: black;
  }
  .f {
    background: pink;
  }
`;
const Circle = styled.div<{ ref: React.RefObject<HTMLDivElement> }>`
  background: pink;
  /* .circle {
    background: pink;
    width: 4rem;
    height: 4rem;
  } */
`;
export default function LandingPage() {
  const [text, setText] = useState('');
  const main = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to('dd', {
      // y: 200,
      // duration: 2,
      // scrollTrigger: {
      //   trigger: 'box',
      //   markers: true,
      //   start: 'top center',
      //   end: 'bot bottom',
      // },
      opacity: 1,
      duration: 0,
    });
    const LandingPageScrollTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: '.dd',
        toggleActions: 'restart restart restart restart',
        start: '0% 100%',
        end: '50% 0%',
        markers: true,
      },
    });
    LandingPageScrollTrigger.from(
      '.first',
      {
        opacity: 0,
        x: '-31%',
        duration: 2.2,
        ease: 'sine.in',
      },
      0,
    )
      .from(
        '.second',
        {
          opacity: 0,
          x: '40%',
          duration: 2.2,
          ease: 'sine.in',
        },
        0,
      )
      .from(
        '.topBtn',
        {
          opacity: 0,
          x: '-40%',
          duration: 2.2,
          stagger: 0.4,
          ease: 'sine.inOut',
        },
        0.2,
      );

    // .from('.landingPage section h1 span', {
    //     opacity: 0, x: "-22%", duration: 2.2, ease: "sine.inOut",
    // }, 0.4)
    // .from('.landingPage #d', {
    //     opacity: 0, x: "22%", duration: 2.2, ease: "sine.inOut",
    // }, 0.4)
    // .from('.landingPage section p span', {
    //     opacity: 0, x: "-31%", duration: 2.2, stagger: 0.4, ease: "sine",
    // }, 0.8)
    // .from('.landingPage #ScrollDown p', {
    //     opacity: 0, y: "-61.8%", duration: 2.2, ease: "sine",
    // }, 1.6)
  }, []);

  // useLayoutEffect(() => {
  //   const ctx = gsapcontext((self: any) => {
  //     const boxes: any = self.selector('.box');
  //     boxes.forEach((box: any) => {
  //       gsap.to(box, {
  //         x: 500, //만큼이동
  //         scrollTrigger: {
  //           trigger: box,
  //           start: 'bottom bottom', //시작지점
  //           end: 'top 20%',
  //           scrub: true, //효과
  //         },
  //       });
  //     });
  //   }, main); // <- Scope!
  //   return () => ctx.revert(); // <- Cleanup!
  // }, []);

  return (
    <div className="dd">
      <ThirdCard />
      <MiddleCard />

      <TopCard />
    </div>
  );
}
