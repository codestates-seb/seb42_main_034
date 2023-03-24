import React, { ClassAttributes, MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Gsap() {
  const app = useRef<HTMLInputElement>(null);
  const circle = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // use scoped selectors
      gsap.to('.animation', { rotation: 360 });
      // or refs
      gsap.to(circle.current, { rotation: 360 });
    }, app);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={app} className="App">
      <div className="box">selector</div>
      <div className="circle" ref={circle}>
        Ref
      </div>
    </div>
  );
}
