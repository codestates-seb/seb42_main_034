// import React, { useLayoutEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);
// interface Context {
//   [key: string]: any;
//   selector?: () => void;
//   isReverted: boolean;
//   conditions?: any;
//   queries?: object;
//   add(methodName: string, func: () => void, scope?: Element | string | object): () => void;
//   add(func: () => void, scope?: Element | string | object): void;
//   ignore(func: () => void): void;
//   kill(revert?: boolean): void;
//   revert(config?: object): void;
//   clear(): void;
// }
// export default function Scroll() {
//   const main = useRef();

//   useLayoutEffect(() => {
//     const ctx = gsap.context((self: gsap.Context) => {
//       const boxes: () => void = self.selector('.box');
//       boxes.forEach((box:any) => {
//         gsap.to(box, {
//           x: 150,
//           scrollTrigger: {
//             trigger: box,
//             start: 'bottom bottom',
//             end: 'top 20%',
//             scrub: true,
//           },
//         });
//       });
//     }, main); // <- Scope!
//     return () => ctx.revert(); // <- Cleanup!
//   }, []);

//   return (
//     <div>
//       <section className="section flex-center column">
//         <h1>Basic ScrollTrigger with React</h1>
//         <h2>Scroll down to see the magic happen!!</h2>
//       </section>
//       <div className="section flex-center column" ref={main}>
//         <div className="box">box</div>
//         <div className="box">box</div>
//         <div className="box">box</div>
//       </div>
//       <section className="section"></section>
//     </div>
//   );
// }
