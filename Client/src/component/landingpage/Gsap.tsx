import React, {
  ClassAttributes,
  FunctionComponentFactory,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { gsap } from 'gsap';
import styled from 'styled-components';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const Circle = styled.div<{ ref: React.RefObject<HTMLDivElement> }>`
  .box {
    background: pink;
    width: 4rem;
    height: 4rem;
    color: pink;
  }
`;
const D = styled.div`
  && {
    background: black;
  }
  .f {
    background: pink;
  }
`;
export default function Gsap() {
  const main = useRef<HTMLDivElement>(null);

  //   useLayoutEffect(() => {
  //     const ctx = gsap.context((self: any) => {
  //       const boxes: any = self.selector('.box');
  //       boxes.forEach((box: any) => {
  //         gsap.to(box, {
  //           x: 150, //만큼이동
  //           scrollTrigger: {
  //             trigger: box,
  //             start: 'bottom bottom', //시작지점
  //             end: 'top 20%',
  //             scrub: true, //효과
  //           },
  //         });
  //       });
  //     }, main); // <- Scope!
  //     return () => ctx.revert(); // <- Cleanup!
  //   }, []);

  return (
    <div>
      <section className="section flex-center column">
        <h1>Basic ScrollTrigger with React</h1>
        <h2>Scroll down to see the magic happen!!</h2>
      </section>
      <div className="section flex-center column" ref={main}>
        <div className="box">box</div>
        <div className="box">box</div>
        <div className="box">box</div>
        <Circle className="circle box" ref={main}>
          ss
        </Circle>
        <D className="f">
          ddsfds<button className="f">sss</button>
        </D>
      </div>

      <section className="section"></section>
    </div>
  );
}
