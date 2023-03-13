import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      main_01: string;
      main_02: string;
      main_03: string;
      button_01: string;
      button_text: string;
      button_clicked: string;
      text_warn: string;
      text_black: string;
      text_grey: string;
      text_white: string;
      text_green: string;
      border_001: string;
      border_002: string;
      border_003: string;
    };
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
    fontSize: {
      sm: string;
      md: string;
      lg: string;
      h1: string;
      h2: string;
      h3: string;
    };
    // fontWeight: {
    //   extraBold: number;
    //   bold: number;
    //   semiBold: number;
    //   reguler: number;
    //   thin: number;
    // };
  }
}
