import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main1: string;
      main2: string;
      main3: string;
      button: string;
      buttonHover: string;
      buttonClicked: string;
      warn: string;
      black: string;
      grey: string;
      white: string;
      green: string;
      border1: string;
      border2: string;
      border3: string;
    };
    font: {
      small: string;
      base: string;
      large: string;
      h1: string;
      h2: string;
      h3: string;
    };
  }
  // media;
}
declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}
declare module '*.svg';
// import { ColorTypes, FontSizeTypes, Theme } from './theme';
// import { CSSProp } from 'styled-components';
// declare module 'styled-components' {
//   export interface DefaultTheme extends Theme {
//     color: ColorTypes;

//     fontSize: FontSizeTypes;
//   }
// }
// declare module 'react' {
//   interface Attributes {
//     css?: CSSProp | CSSObject;
//   }
// }
