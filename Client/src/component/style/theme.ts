import { DefaultTheme } from 'styled-components';
import media from './media';

const color: DefaultTheme = {
  color: {
    main_01: '#B0DBFC',
    main_02: '#66BFFF',
    main_03: '#62A3F4',
    button_01: '#62A3F4',
    button_text: '#FDFFEC',
    button_clicked: '#486AC2',
    text_warn: '#FF4848',
    text_black: '#0C0D0E',
    text_grey: '#828282',
    text_white: '#FFFFFF',
    text_green: '#81EE7F',
    border_001: '#E3E6E8',
    border_002: '#D6D9DC',
    border_003: '#C8CCD0',
  },
  fontSize: {
    sm: '14px',
    md: '18px',
    lg: '22px',
    h1: '34px',
    h2: '30px',
    h3: '26px',
  },
};
//미디어 쿼리설정값과 컬러설정값을 export
export const theme = {
  color,
  media,
};

export type Theme = typeof theme;
