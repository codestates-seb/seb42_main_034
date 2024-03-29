import TopCard from 'component/landingpage/TopCard';

import React, { useState, useRef, useEffect } from 'react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import MiddleCard from 'component/landingpage/MiddleCard';
import ThirdCard from 'component/landingpage/ThirdCard';
import styled from 'styled-components';
import Maincard from 'component/landingpage/Maincard';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [text, setText] = useState('');
  const main = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to('.landingPage', {
      opacity: 1,
      duration: 0,
    });

    const Silde1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.slide1',
        toggleActions: 'restart restart restart restart',
        start: '100% 100%',
        end: '300% 0%',

        // markers: true,
      },
    });
    Silde1.from(
      '.top1',
      {
        opacity: 0,
        x: '-31%',
        duration: 2.2,
        ease: 'sine.in',
      },
      0,
    )
      .from('.top2', {
        opacity: 0,
        x: '-22%',
      })
      .from('.top3', {
        opacity: 0,
        x: '-22%',
      }); // Sli

    //지도
    const Slide2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.slide2',
        start: 'top center',
        end: 'bottom bottom',
        // markers: true,
        // scrub: 2.2,
        // pin: '.slide2',
      },
    });
    Slide2.from('.middle1', {
      opacity: 0,
      x: '-22%',
    })
      .from('.middle2', {
        opacity: 0,
        x: '-22%',
      })
      .from('.middle3', {
        opacity: 0,
        x: '-22%',
      }); // Sli

    const Slide3 = gsap.timeline({
      scrollTrigger: {
        trigger: '.slide3',
        start: 'top center',
        end: 'center bottom',
        // markers: true,
        scrub: 2.2,

        // pin: '.slide3',
      },
    });
    Slide3.from(
      '.third1',
      {
        opacity: 0,
        x: '-31%',
        duration: 2.2,
        ease: 'sine.in',
      },
      0,
    )
      .from(
        '.third2',
        {
          opacity: 0,
          x: '-31%',
          duration: 2.2,
          ease: 'sine.in',
        },
        0,
      )
      .from('.third3', {
        opacity: 0,
        x: '-22%',
      });
  }, []);

  return (
    <LandingPageLayOut className="landingPage">
      <Maincard />
      <TopCard />
      <MiddleCard />
      <ThirdCard />
    </LandingPageLayOut>
  );
}

const LandingPageLayOut = styled.div`
  text-align: center;
`;
