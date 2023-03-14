import { ColorTypes, FontSizeTypes, Theme } from './theme';
import { CSSProp } from 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    color: ColorTypes;
    // mode: {
    //   title: string;
    //   toggle: string;
    //   header: string;
    //   mainBackground: string;
    //   subBackground: string;
    //   imgBackground: string;
    //   sideBackground: string;
    //   navLink: string;
    //   linkText: string;
    //   listText: string;
    // };
    fontSize: FontSizeTypes;
    // fontWeight: {
    //   extraBold: number;
    //   bold: number;
    //   semiBold: number;
    //   reguler: number;
    //   thin: number;
    // };
  }
}
declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}
