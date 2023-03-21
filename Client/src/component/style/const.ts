import { RegionInfo } from 'pages/Home';
import { css } from 'styled-components';

export enum FontSize {
  sm = '14px',
  md = '18px',
  lg = '22px',
  h1 = '34px',
  h2 = '30px',
  h3 = '26px',
}
export enum Colors {
  main_01 = '#B0DBFC',
  main_02 = '#66BFFF',
  main_03 = '#62A3F4',
  main_04_white = '#F3F3F3',
  button_blue = '#62A3F4',
  button_text = '#FDFFEC',
  button_clicked = '#486AC2',
  button_hover = '#FDFFEC',
  text_warn = '#FF4848',
  text_black = '#0C0D0E',
  text_grey = '#828282',
  text_white = '#FFFFFF',
  text_green = '#81EE7F',
  border_001 = '#E3E6E8',
  border_002 = '#D6D9DC',
  border_003 = '#C8CCD0',
}
export enum ImageSize {
  sm = '3rem',
  md = '10rem',
  lg = '20rem',
}
export enum ScreenSize {
  max_height = '1400px',
  middle_height = '900px',
  footer_height = '200px',
  max_width = '1284px',
}
export enum Route {
  mainPage = '/',
  home = '/home',
  blog = '/board/bloglist',
  blog_detail = '/board/boarddetails/:id',
  blog_post = '/board/blogpost',
  question = '/board/questionlist',
  question_detail = '/board/questiondetails/:id',
  question_post = '/board/questionpost',
  signin = '/board/signin',
  signup = '/board/signup',
}
export const cities: Array<Partial<RegionInfo>> = [
  { city: '서울', x: 40, y: 50 },
  { city: '부산', x: 46, y: 100 },
  { city: '대전', x: 23, y: 70 },
];
