import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Gsap() {
  const boxRef = useRef(null);
  useEffect(() => {
    gsap.to(boxRef.current, 1, { transform: 'translateX(200px)', delay: 0.5, ease: 'ease' });
  }, []);

  return <div></div>;
}
