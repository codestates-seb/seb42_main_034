import { RegionInfo } from 'pages/Home';
import { css } from 'styled-components';

export enum FontSize {
  sm = '10px',
  md = '12px',
  lg = '20px',
  h1 = '33px',
  h2 = '29px',
  h3 = '26px',
  main = '36px',
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
  board_color = '#FFFFFF',
  boardlist_color = 'rgba(0,255,255,0.3)',
  Modal = 'rgba(192, 184, 184, 0.1)',
}
export enum DarkMode {
  borad_background = 'rgba(222, 217, 217, 0.778)',
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
  max_width = '1250px',
}
export enum Route {
  mainPage = '/',
  home = '/home',
  blog = '/board/bloglist',
  blog_detail = '/board/boarddetails/:id',
  blog_post = '/board/blogpost',
  question = '/board/questionlist/',
  question_detail = '/board/questiondetails/:id',
  question_post = '/board/questionpost',
  signin = '/board/signin',
  signup = '/board/signup',
}
export const cities = [
  {
    city: '서울',
    x: 22.8,
    y: 9,
    url: 'https://cdn.hkbs.co.kr/news/photo/202009/588588_340699_5355.jpg',
  },
  {
    city: '부산',
    x: 34,
    y: 29,
    url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.klook.com%2Fko%2Fcity%2F46-busan-things-to-do%2F&psig=AOvVaw1aCFoQ-vd9vYuwV3O8gSM2&ust=1681921727225000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIj_xurss_4CFQAAAAAdAAAAABAE',
  },

  {
    city: '충청',
    x: 25,
    y: 18,
    url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.brcn.go.kr%2Fprog%2Fattraction%2Ftour%2Fsub01_12%2Fview.do%3FattractionCode%3D31&psig=AOvVaw0stBItPxBgGUvJ4w_Ow0ms&ust=1681921793376000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMDX-4nts_4CFQAAAAAdAAAAABAE',
  },
  {
    city: '강원',
    x: 33,
    y: 8,
    url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.gtdc.or.kr%2Fv2.1%2Ftravel%2Fbeach.html&psig=AOvVaw3IYzFB4345iQ06SpmABjLB&ust=1681921850901000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCND4tqXts_4CFQAAAAAdAAAAABAJ',
  },
  {
    city: '전라',
    x: 24,
    y: 28,
    url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fbrunch.co.kr%2F%40expediakr%2F806&psig=AOvVaw2q2-TyStg_B_yXwfu7mnZ6&ust=1681921878523000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOiM2rLts_4CFQAAAAAdAAAAABAE',
  },
  {
    city: '울산',
    x: 40,
    y: 27.5,
    url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.blog.naver.com%2Fmovingbox1%2F221372307015&psig=AOvVaw1B-1cCd6JXryMNXFh6ncAF&ust=1681921905285000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMjzsL_ts_4CFQAAAAAdAAAAABAR',
  },
  {
    city: '경기',
    x: 25,
    y: 12,
    url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fheritage.unesco.or.kr%2F%25ED%2599%2594%25EC%2584%25B1%2F&psig=AOvVaw1yrIfiOcGGff8Cz_zxcSwr&ust=1681922714662000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJDts8Hws_4CFQAAAAAdAAAAABAE',
  },
  {
    city: '인천',
    x: 19.5,
    y: 10.5,
    url: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.my-land.co.kr%2Fmobile_public%2Fmenu6.html&psig=AOvVaw1tyrapqiIUuM-2fObeYa2H&ust=1681918667769000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKjT4bfhs_4CFQAAAAAdAAAAABAE',
  },
  {
    city: '제주',
    x: 19.5,
    y: 20,
    url: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.jejusori.net%2Fnews%2FarticleView.html%3Fidxno%3D409023&psig=AOvVaw04Xo56zpiY4JpjONxt9vB8&ust=1681921680537000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCLibp9Tss_4CFQAAAAAdAAAAABAE',
  },
];
